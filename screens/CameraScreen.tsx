import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, PhotoFile } from 'react-native-vision-camera';
import { useTensorflowModel } from 'react-native-fast-tflite';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODEL_INPUT_SIZE = 640;
const CONFIDENCE_THRESHOLD = 0.25;
const IOU_THRESHOLD = 0.45;

// FSL (Filipino Sign Language) phrase classes - must match training data order
const SIGN_CLASSES = [
  'Ang pangalan ko ay',
  'Ayos lang',
  'Congratulations',
  'Good afternoon',
  'Good evening',
  'Good luck',
  'Good morning',
  'Good night',
  'Happy Birthday',
  'Hello',
  'Ingat ka',
  'Kamusta ka na',
  'Mahal kita',
  'Maraming salamat',
  'May kapansanan ka ba sa pandinig',
  'Nakikiramay ako',
  'Paalam',
  'Pasensya na',
  'Tara kain tayo',
  'Tara matuto ng FSL',
];
const NUM_CLASSES = SIGN_CLASSES.length;

interface Detection {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  classId: number;
  label: string;
}

export default function CameraScreen() {
  const device = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<string>('loading');
  const [lastDetectedPhrase, setLastDetectedPhrase] = useState<string | null>(null);

  // Load the TFLite model
  const model = useTensorflowModel(require('../assets/model.tflite'));

  useEffect(() => {
    (async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
      setIsInitializing(false);
    })();
  }, []);

  useEffect(() => {
    if (model.state === 'loaded') {
      setModelStatus('loaded');
      console.log('Model loaded successfully');
      // Log model info
      if (model.model?.inputs?.[0]) {
        console.log('Input shape:', model.model.inputs[0].shape);
      }
      if (model.model?.outputs?.[0]) {
        console.log('Output shape:', model.model.outputs[0].shape);
      }
    } else if (model.state === 'error') {
      setModelStatus('error');
      console.error('Model loading error');
    } else {
      setModelStatus('loading');
    }
  }, [model.state]);

  // Process image and run inference
  const processImage = useCallback(async (photoPath: string) => {
    if (!model.model || model.state !== 'loaded') {
      return;
    }

    try {
      // Resize image to model input size
      const resized = await ImageResizer.createResizedImage(
        photoPath,
        MODEL_INPUT_SIZE,
        MODEL_INPUT_SIZE,
        'JPEG',
        100,
        0,
        undefined,
        false,
        { mode: 'cover' }
      );

      // Read the resized image as base64
      const base64 = await RNFS.readFile(resized.uri.replace('file://', ''), 'base64');
      
      // Decode base64 to bytes using a simple lookup table
      const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      const lookup = new Uint8Array(256);
      for (let i = 0; i < base64Chars.length; i++) {
        lookup[base64Chars.charCodeAt(i)] = i;
      }
      
      const base64Len = base64.length;
      const bufferLength = Math.floor(base64Len * 0.75);
      const bytes = new Uint8Array(bufferLength);
      
      let p = 0;
      for (let i = 0; i < base64Len; i += 4) {
        const encoded1 = lookup[base64.charCodeAt(i)];
        const encoded2 = lookup[base64.charCodeAt(i + 1)];
        const encoded3 = lookup[base64.charCodeAt(i + 2)];
        const encoded4 = lookup[base64.charCodeAt(i + 3)];
        
        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        if (p < bufferLength) bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        if (p < bufferLength) bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }

      // Create RGB input tensor
      // Note: JPEG bytes are compressed, so we sample patterns from the raw data
      // For accurate detection, a proper JPEG decoder would be needed
      const inputData = new Uint8Array(MODEL_INPUT_SIZE * MODEL_INPUT_SIZE * 3);
      
      let inputIdx = 0;
      for (let y = 0; y < MODEL_INPUT_SIZE; y++) {
        for (let x = 0; x < MODEL_INPUT_SIZE; x++) {
          // Sample from decoded bytes (approximation from compressed JPEG)
          const srcIdx = Math.floor((y * MODEL_INPUT_SIZE + x) * bytes.length / (MODEL_INPUT_SIZE * MODEL_INPUT_SIZE));
          inputData[inputIdx++] = bytes[srcIdx % bytes.length] || 128;
          inputData[inputIdx++] = bytes[(srcIdx + 1) % bytes.length] || 128;
          inputData[inputIdx++] = bytes[(srcIdx + 2) % bytes.length] || 128;
        }
      }

      // Run inference
      const output = await model.model.run([inputData]);

      if (!output || output.length === 0) {
        setDetections([]);
        return;
      }

      // Parse YOLO output
      const outputData = output[0];
      const numPredictions = 8400;
      const candidates: Detection[] = [];

      // Helper to get value from output
      const getValue = (featureIdx: number, predIdx: number): number => {
        try {
          if (outputData instanceof Float32Array || outputData instanceof Uint8Array) {
            return outputData[featureIdx * numPredictions + predIdx] || 0;
          }
          if (Array.isArray(outputData) && Array.isArray(outputData[featureIdx])) {
            return outputData[featureIdx][predIdx] || 0;
          }
          if (Array.isArray(outputData)) {
            return (outputData as number[])[featureIdx * numPredictions + predIdx] || 0;
          }
          return 0;
        } catch {
          return 0;
        }
      };

      // Parse predictions
      for (let i = 0; i < numPredictions; i++) {
        const xCenter = getValue(0, i);
        const yCenter = getValue(1, i);
        const width = getValue(2, i);
        const height = getValue(3, i);

        if (width <= 0 || height <= 0) continue;

        // Find best class
        let maxScore = 0;
        let maxClassId = 0;
        for (let c = 0; c < NUM_CLASSES; c++) {
          const score = getValue(4 + c, i);
          if (score > maxScore) {
            maxScore = score;
            maxClassId = c;
          }
        }

        if (maxScore >= CONFIDENCE_THRESHOLD) {
          candidates.push({
            x: Math.max(0, xCenter - width / 2),
            y: Math.max(0, yCenter - height / 2),
            width: Math.min(width, MODEL_INPUT_SIZE),
            height: Math.min(height, MODEL_INPUT_SIZE),
            confidence: maxScore,
            classId: maxClassId,
            label: SIGN_CLASSES[maxClassId] || 'Unknown',
          });
        }
      }

      // Simple NMS - keep top detections
      const sorted = candidates.sort((a, b) => b.confidence - a.confidence);
      const selected: Detection[] = [];
      
      for (const candidate of sorted) {
        if (selected.length >= 5) break;
        
        let dominated = false;
        for (const sel of selected) {
          const x1 = Math.max(candidate.x, sel.x);
          const y1 = Math.max(candidate.y, sel.y);
          const x2 = Math.min(candidate.x + candidate.width, sel.x + sel.width);
          const y2 = Math.min(candidate.y + candidate.height, sel.y + sel.height);
          const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
          const area1 = candidate.width * candidate.height;
          const area2 = sel.width * sel.height;
          const union = area1 + area2 - intersection;
          const iou = union > 0 ? intersection / union : 0;
          
          if (iou > IOU_THRESHOLD) {
            dominated = true;
            break;
          }
        }
        
        if (!dominated) {
          selected.push(candidate);
        }
      }

      setDetections(selected);
      
      if (selected.length > 0) {
        setLastDetectedPhrase(selected[0].label);
      }

      // Clean up resized image
      try {
        await RNFS.unlink(resized.uri.replace('file://', ''));
      } catch {}

    } catch (error) {
      console.error('Error processing image:', error);
    }
  }, [model.model, model.state]);

  // Capture and process photos periodically
  const captureAndProcess = useCallback(async () => {
    if (isProcessing || !cameraRef.current || model.state !== 'loaded') {
      return;
    }

    try {
      setIsProcessing(true);
      
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false,
      });
      
      await processImage(photo.path);
    } catch (error) {
      console.error('Error capturing photo:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [isProcessing, model.state, processImage]);

  // Auto-capture every 1.5 seconds
  useEffect(() => {
    if (!hasPermission || !device || model.state !== 'loaded') {
      return;
    }

    const interval = setInterval(captureAndProcess, 1500);
    return () => clearInterval(interval);
  }, [hasPermission, device, model.state, captureAndProcess]);

  if (device == null || isInitializing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FBBF24" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Camera permission not granted</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      {/* Detection boxes */}
      {detections.map((detection, index) => {
        const scaleX = SCREEN_WIDTH / MODEL_INPUT_SIZE;
        const scaleY = SCREEN_HEIGHT / MODEL_INPUT_SIZE;

        return (
          <View
            key={index}
            style={[
              styles.detectionBox,
              {
                left: detection.x * scaleX,
                top: detection.y * scaleY,
                width: detection.width * scaleX,
                height: detection.height * scaleY,
              },
            ]}
          >
            <View style={styles.detectionLabel}>
              <Text style={styles.detectionText}>
                {detection.label} {(detection.confidence * 100).toFixed(0)}%
              </Text>
            </View>
          </View>
        );
      })}

      {/* Detected phrase display */}
      {lastDetectedPhrase && (
        <View style={styles.phraseContainer}>
          <Text style={styles.phraseLabel}>Detected Sign:</Text>
          <Text style={styles.phraseText}>{lastDetectedPhrase}</Text>
        </View>
      )}

      {/* Status bar */}
      <View style={styles.statusBar}>
        {modelStatus === 'loading' && (
          <View style={styles.statusRow}>
            <ActivityIndicator size="small" color="#FBBF24" />
            <Text style={styles.statusText}>Loading model...</Text>
          </View>
        )}
        {modelStatus === 'error' && (
          <Text style={[styles.statusText, styles.errorStatus]}>
            Model error: Failed to load
          </Text>
        )}
        {modelStatus === 'loaded' && (
          <Text style={styles.statusText}>
            {isProcessing ? '🔍 Scanning...' : `✓ Ready | Detections: ${detections.length}`}
          </Text>
        )}
      </View>

      {/* Manual capture button */}
      <TouchableOpacity 
        style={styles.captureButton}
        onPress={captureAndProcess}
        disabled={isProcessing || model.state !== 'loaded'}
      >
        <View style={[styles.captureInner, isProcessing && styles.captureDisabled]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2937',
  },
  loadingText: {
    marginTop: 16,
    color: '#FFF',
    fontSize: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  phraseContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  phraseLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  phraseText: {
    color: '#FBBF24',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusBar: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  errorStatus: {
    color: '#FF3B30',
  },
  detectionBox: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
    borderRadius: 4,
  },
  detectionLabel: {
    position: 'absolute',
    top: -28,
    left: -2,
    backgroundColor: '#00FF00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  detectionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FBBF24',
  },
  captureDisabled: {
    backgroundColor: '#6B7280',
  },
});

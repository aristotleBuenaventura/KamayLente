# YOLOv11 Sign Language Detection Setup

## ✅ Installation Complete

All required packages have been installed and configured:

### Installed Packages
- ✅ `react-native-fast-tflite` (v2.0.0) - TensorFlow Lite inference engine
- ✅ `react-native-reanimated` (v4.2.1) - Required for frame processors
- ✅ `vision-camera-resize-plugin` (v3.2.0) - Frame resizing for model input

### Configuration Updates
- ✅ `metro.config.js` - Added `.tflite` asset extension support
- ✅ `babel.config.js` - Added react-native-reanimated plugin
- ✅ `CameraScreen.tsx` - Integrated YOLOv11 detection with sign language alphabet support

## 📋 Next Steps

### 1. Add YOLOv11 Model

You need to convert and add your YOLOv11 model:

1. **Convert YOLOv11 to TFLite:**
   ```python
   from ultralytics import YOLO
   
   # Load your trained model
   model = YOLO('yolov11_sign_language.pt')
   
   # Export to TFLite (640x640 input)
   model.export(format='tflite', imgsz=640)
   ```

2. **Place the model file:**
   - Location: `assets/yolov11_sign_language.tflite`
   - The app will automatically load it on startup

### 2. Model Requirements

Your YOLOv11 model should:
- **Input:** 640x640 RGB images
- **Output format:** [batch, num_detections, 6]
  - Where 6 = [x_center, y_center, width, height, confidence, class_id]
- **Classes:** 26 classes (A-Z alphabet)
- **Class mapping:** 0=A, 1=B, 2=C, ..., 25=Z

### 3. Rebuild the App

After adding the model file:

```bash
# For Android
npm run android

# For iOS
cd ios && pod install && cd ..
npm run ios
```

## 🎯 Features Implemented

- ✅ Real-time camera feed processing
- ✅ YOLOv11 model inference on device
- ✅ Sign language alphabet detection (A-Z)
- ✅ Bounding box visualization
- ✅ Confidence score display
- ✅ Detection count status bar
- ✅ Error handling and loading states

## 🔧 Troubleshooting

### Model Not Found Error
- Ensure the model file is at: `assets/yolov11_sign_language.tflite`
- Rebuild the app after adding the model
- Check that metro.config.js includes `.tflite` in asset extensions

### No Detections
- Verify your model output format matches the expected format
- Check that class IDs are 0-25 for A-Z
- Adjust confidence threshold in CameraScreen.tsx (currently 0.5)

### Performance Issues
- The model runs on CPU by default
- For better performance, consider using GPU delegates (requires model optimization)
- Reduce frame processing frequency if needed

## 📝 Code Structure

- **CameraScreen.tsx**: Main detection implementation
  - Frame processing with `useFrameProcessor`
  - Model loading with `useTensorflowModel`
  - Detection visualization overlay
  - Error and loading states

- **Model Output Parsing**: 
  - Handles YOLOv11 standard output format
  - Converts normalized coordinates to pixel coordinates
  - Filters by confidence threshold (0.5)

## 🔗 Resources

- [YOLOv11 Documentation](https://docs.ultralytics.com/)
- [react-native-fast-tflite](https://github.com/mrousavy/react-native-fast-tflite)
- [react-native-vision-camera](https://react-native-vision-camera.github.io/docs/)

## ⚠️ Important Notes

1. **Model Format**: The model must be in TFLite format, not PyTorch (.pt)
2. **Input Size**: Currently hardcoded to 640x640 - adjust if your model uses different size
3. **Class Count**: Assumes 26 classes (A-Z) - modify `ALPHABET_CLASSES` if different
4. **Output Format**: The code expects [x_center, y_center, w, h, conf, class_id] format
5. **Performance**: Frame processing runs on every frame - consider throttling for better battery life

## 🚀 Ready to Use

Once you add your YOLOv11 model file, the app will:
1. Load the model on startup
2. Process camera frames in real-time
3. Detect sign language letters (A-Z)
4. Display bounding boxes and labels
5. Show detection count in status bar

Enjoy your sign language detection app! 🤟

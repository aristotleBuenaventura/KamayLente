"""
Generate a dummy TFLite model for testing YOLOv11 sign language detection.

This script creates a minimal TFLite model with the expected input/output shapes
so you can test the React Native integration without a trained model.

Usage:
    python generate_dummy_model.py

Output:
    yolov11_sign_language.tflite in the assets folder
"""

import tensorflow as tf
import numpy as np
import os

def create_dummy_yolo_model():
    """
    Create a minimal TFLite model that mimics YOLOv11 output format.
    
    Input: [1, 640, 640, 3] - RGB image
    Output: [1, 100, 6] - Detections where 6 = [x_center, y_center, w, h, conf, class_id]
    """
    
    # Create a simple model using Keras
    input_layer = tf.keras.layers.Input(shape=(640, 640, 3), name='input')
    
    # Simple processing layers (just for structure, not actual YOLO)
    x = tf.keras.layers.Conv2D(32, 3, padding='same')(input_layer)
    x = tf.keras.layers.ReLU()(x)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    
    # Dummy output layer that produces [batch, 100, 6] shape
    # This simulates 100 detections with 6 values each
    x = tf.keras.layers.Dense(100 * 6)(x)
    output = tf.keras.layers.Reshape((100, 6))(x)
    
    model = tf.keras.Model(inputs=input_layer, outputs=output, name='dummy_yolo')
    
    # Initialize with random weights (will produce random detections)
    # In a real model, these would be trained weights
    model.compile()
    
    return model

def convert_to_tflite(model, output_path):
    """Convert Keras model to TFLite format."""
    
    # Create TFLite converter
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    
    # Optional: Optimize for size (quantization)
    # converter.optimizations = [tf.lite.Optimize.DEFAULT]
    
    # Convert to TFLite
    tflite_model = converter.convert()
    
    # Save the model
    with open(output_path, 'wb') as f:
        f.write(tflite_model)
    
    print(f"✅ Dummy TFLite model saved to: {output_path}")
    print(f"   Model size: {len(tflite_model) / 1024:.2f} KB")
    
    # Verify the model
    interpreter = tf.lite.Interpreter(model_path=output_path)
    interpreter.allocate_tensors()
    
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    
    print(f"\n📊 Model Details:")
    print(f"   Input shape: {input_details[0]['shape']}")
    print(f"   Output shape: {output_details[0]['shape']}")
    print(f"\n⚠️  Note: This is a DUMMY model for testing only!")
    print(f"   It will produce random detections, not actual sign language recognition.")

if __name__ == '__main__':
    # Get the script directory (assets folder)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_path = os.path.join(script_dir, 'yolov11_sign_language.tflite')
    
    print("🔧 Generating dummy YOLOv11 TFLite model...")
    print(f"   Output: {output_path}\n")
    
    try:
        # Create dummy model
        model = create_dummy_yolo_model()
        
        # Convert to TFLite
        convert_to_tflite(model, output_path)
        
        print(f"\n✅ Success! You can now test the React Native app.")
        print(f"   The model will load but produce random detections.")
        print(f"   Replace this with your trained YOLOv11 model for real detection.")
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\n💡 Make sure you have TensorFlow installed:")
        print("   pip install tensorflow")

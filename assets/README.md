# Assets Folder

## 🧪 Quick Test (No Trained Model Needed)

**Want to test the code without a trained model?** Use the dummy model generator:

1. **Install TensorFlow**:
   ```bash
   pip install tensorflow
   ```

2. **Generate dummy model**:
   ```bash
   cd assets
   python generate_dummy_model.py
   ```

3. **Rebuild the app** - The dummy model will load and show random detections (proving the integration works!)

See `README_TESTING.md` for more details.

---

## YOLOv11 Model Setup

To enable **real** sign language detection, you need to:

1. **Convert YOLOv11 model to TFLite format:**
   ```python
   # Using ultralytics YOLOv11
   from ultralytics import YOLO
   
   # Load your trained YOLOv11 model
   model = YOLO('yolov11_sign_language.pt')
   
   # Export to TFLite
   model.export(format='tflite', imgsz=640)
   ```

2. **Place the model file here:**
   - File name: `yolov11_sign_language.tflite`
   - Location: `assets/yolov11_sign_language.tflite`

3. **Model Requirements:**
   - Input size: 640x640 RGB
   - Output format: [batch, num_detections, 6] where 6 = [x_center, y_center, width, height, confidence, class_id]
   - Classes: 26 classes (A-Z alphabet)
   - Class IDs: 0-25 mapping to A-Z respectively

4. **Rebuild the app:**
   ```bash
   npm run android
   # or
   npm run ios
   ```

## Model Training Tips

If you need to train a custom YOLOv11 model for sign language:

1. Collect dataset of sign language alphabet images (A-Z)
2. Annotate with bounding boxes using tools like LabelImg or Roboflow
3. Train YOLOv11 model with 26 classes
4. Export to TFLite format as shown above
5. Place in this assets folder

## Alternative: Pre-trained Models

You can also use pre-trained sign language detection models:
- Search for "ASL alphabet YOLO" or "sign language detection YOLO" models
- Convert them to TFLite format if needed
- Ensure they have 26 classes for A-Z alphabet

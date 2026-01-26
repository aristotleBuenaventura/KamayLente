# Testing with Dummy Model

## Quick Test Setup

To test the YOLOv11 integration without a trained model, you can generate a dummy TFLite file:

### Option 1: Generate Dummy Model (Recommended)

1. **Install TensorFlow** (if not already installed):
   
   **⚠️ Important**: TensorFlow requires Python 3.8-3.12. If you have Python 3.14, install Python 3.12 and use:
   ```bash
   py -3.12 -m pip install tensorflow
   ```
   
   Or if you have a compatible Python version:
   ```bash
   pip install tensorflow
   ```
   
   See `PYTHON_SETUP.md` in the project root for detailed instructions.

2. **Run the generator script**:
   
   If using Python 3.12 (required for TensorFlow):
   ```bash
   py -3.12 assets/generate_dummy_model.py
   ```
   
   Or if you have TensorFlow installed with your default Python:
   ```bash
   cd assets
   python generate_dummy_model.py
   ```

3. **The script will create**:
   - `yolov11_sign_language.tflite` in the assets folder

4. **Rebuild your React Native app**:
   ```bash
   npm run android
   # or
   npm run ios
   ```

### What the Dummy Model Does

- ✅ Has the correct input/output shapes expected by the code
- ✅ Will load successfully in the app
- ✅ Will process camera frames without crashing
- ⚠️ **Will produce random detections** (not real sign language recognition)

### Expected Behavior

When you run the app with the dummy model:
- The model will load successfully ✅
- Camera will work ✅
- Frame processing will run ✅
- You'll see random bounding boxes with random letters (A-Z) ✅
- This confirms the integration is working! ✅

### Next Steps

Once you confirm everything works:
1. Train or obtain a real YOLOv11 model for sign language
2. Convert it to TFLite format (see main README.md)
3. Replace the dummy model with your trained model
4. You'll then get real sign language detections!

---

## Alternative: Download a Pre-trained Model

If you want to test with a real (but not sign language specific) model:

1. **Download a pre-trained YOLO model**:
   - Visit: https://github.com/ultralytics/ultralytics
   - Download a YOLOv11 model (e.g., yolov11n.pt)
   - Convert to TFLite using:
     ```python
     from ultralytics import YOLO
     model = YOLO('yolov11n.pt')
     model.export(format='tflite', imgsz=640)
     ```

2. **Note**: Pre-trained models detect common objects (person, car, etc.), not sign language letters. But they're useful for testing the pipeline!

---

## Troubleshooting

### "No module named 'tensorflow'"
- If you have Python 3.14, you need Python 3.12 (see `PYTHON_SETUP.md`)
- Install with: `py -3.12 -m pip install tensorflow`
- Or with compatible Python: `pip install tensorflow`

### "Model file not found" error in app
- Make sure the .tflite file is in the `assets/` folder
- Rebuild the app after adding the file
- Check that metro.config.js includes `.tflite` extension

### Model loads but no detections
- This is normal for the dummy model - it produces random outputs
- Check the console logs for any errors
- Verify the model shape matches expectations

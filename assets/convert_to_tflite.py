"""
Convert YOLO .pt model to TFLite format
"""

from ultralytics import YOLO
import os

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'best.pt')

print(f"Loading model from: {model_path}")

# Load the trained YOLO model
model = YOLO(model_path)

print("Exporting to TFLite format...")

# Export to TFLite
# This will create a folder like 'best_saved_model' with the .tflite file inside
export_path = model.export(format='tflite', imgsz=640)

print(f"\nExport complete!")
print(f"TFLite model saved to: {export_path}")
print("\nYou can now copy the .tflite file to your assets folder and rename it as needed.")

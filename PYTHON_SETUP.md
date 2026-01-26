# Python Setup for TensorFlow

## Issue
TensorFlow doesn't support Python 3.14 yet. TensorFlow currently supports Python 3.8-3.12.

## Solution: Install Python 3.12

### Step 1: Download Python 3.12
1. Visit: https://www.python.org/downloads/release/python-31210/
2. Download **Windows installer (64-bit)** for Python 3.12.10
3. **Important**: During installation, check "Add python.exe to PATH"

### Step 2: Verify Installation
After installation, run:
```powershell
py --list
```

You should see both Python 3.12 and 3.14 listed.

### Step 3: Use Python 3.12 for TensorFlow
Use the `py` launcher to specify Python 3.12:

```powershell
# Install TensorFlow with Python 3.12
py -3.12 -m pip install tensorflow

# Run the dummy model generator with Python 3.12
py -3.12 assets/generate_dummy_model.py
```

### Alternative: Create a Virtual Environment
You can also create a virtual environment with Python 3.12:

```powershell
# Create venv with Python 3.12
py -3.12 -m venv venv_tf

# Activate it
.\venv_tf\Scripts\Activate.ps1

# Install TensorFlow
pip install tensorflow

# Run the script
python assets/generate_dummy_model.py
```

## Quick Commands

```powershell
# Install TensorFlow
py -3.12 -m pip install tensorflow

# Generate dummy model
py -3.12 assets/generate_dummy_model.py
```

## Troubleshooting

### Permission Errors (OSError: [Errno 13] Permission denied)

If you encounter permission errors when installing TensorFlow, try one of these solutions:

**Option 1: Run PowerShell as Administrator**
1. Right-click PowerShell/Command Prompt
2. Select "Run as Administrator"
3. Navigate to your project directory
4. Run: `py -3.12 -m pip install tensorflow`

**Option 2: Use Virtual Environment (Recommended)**
```powershell
# Create venv (run in Administrator PowerShell if you get errors)
py -3.12 -m venv venv_tf

# Activate it
.\venv_tf\Scripts\Activate.ps1

# Install TensorFlow
pip install tensorflow

# Run the script
python assets/generate_dummy_model.py
```

**Option 3: Clean Temp Directory**
Sometimes Windows temp files cause issues. Try:
1. Close all Python processes
2. Delete contents of `C:\Users\aris2\AppData\Local\Temp\` (or restart your computer)
3. Try installing again

**Option 4: Install to User Directory**
```powershell
py -3.12 -m pip install --user tensorflow
```

## Notes
- Python 3.14 will remain your default Python
- Use `py -3.12` when you need TensorFlow
- Use `python` or `py` for other projects (will use 3.14 by default)

from pathlib import Path

VOICE = "en-IN-NeerjaNeural"

UPLOAD_DIR = Path("./uploads")
OUTPUT_DIR = Path("./outputs")

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
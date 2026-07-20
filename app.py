from flask import Flask, render_template, request, send_file
from werkzeug.utils import secure_filename
from pathlib import Path
from pypdf import PdfReader
import edge_tts
import asyncio

app = Flask(__name__)

async def generate_audio(text, output_file_path):
    voice = "en-IN-NeerjaNeural"
    comms = edge_tts.Communicate(text, voice)
    await comms.save(output_file_path)

@app.route('/')
def home(): 
    return render_template("index.html")
    
@app.route('/upload', methods=["POST"])
def upload():
    if "pdf" not in request.files:
        return {
            'success': False,
            'message': 'No Pdf file was found!'
        }
    # featching and saving pdf

    uploaded_file = request.files["pdf"]
    upload_dir = Path("./uploads")
    file_name = secure_filename(uploaded_file.filename)
    path  = upload_dir.joinpath(file_name)
    uploaded_file.save(path)
    print(path)

    # reading pdf
    text = []
    reader = PdfReader(path)
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text is not None:
            text.append(page_text)
    pdf_text = '\n\n'.join(text)
    print(pdf_text)
    print(len(pdf_text))

    # writing outputs 
    output_dir = Path("./outputs")
    extension_mp3 = path.with_suffix(".mp3")
    output_file_name = extension_mp3.name
    output_path = output_dir.joinpath(output_file_name)
    
    # converting text to audio
    asyncio.run(generate_audio(text=pdf_text, output_file_path=output_path))


    if uploaded_file.filename=='':
        return {
            'success': False,
            'message': 'The uploaded file is empty'
        }
    print(uploaded_file.filename)
    return send_file(output_path, download_name=output_file_name, as_attachment=True)
    

if __name__ == "__main__":
    app.run(debug=True, port=5002)
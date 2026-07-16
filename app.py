from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from pathlib import Path
from pypdf import PdfReader

app = Flask(__name__)


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
    upload_dir = "./uploads"
    file_name = secure_filename(uploaded_file.filename)
    path  = Path(upload_dir).joinpath(file_name)
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

    if uploaded_file.filename=='':
        return {
            'success': False,
            'message': 'The uploaded file is empty'
        }
    print(uploaded_file.filename)
    return {
        'success': True,
        'message': 'PDF uploaded successfully.'
    }

if __name__ == "__main__":
    app.run(debug=True, port=5002)
from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from pathlib import Path

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
    
    uploaded_file = request.files["pdf"]
    upload_dir = "./uploads"
    file_name = secure_filename(uploaded_file.filename)
    path  = Path(upload_dir).joinpath(file_name)
    uploaded_file.save(path)
    print(path)
    
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
from flask import Flask

app = Flask(__name__)


@app.route('/')
def home():
    return "home"


if "__main__" == __name__:
    app.run(debug=True, port=5002)
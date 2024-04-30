from flask import Flask
from flask_cors import CORS
from routes.event_routes import init_app

app = Flask(__name__)

CORS(app)
init_app(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
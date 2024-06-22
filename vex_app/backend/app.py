from flask import Flask
from flask_cors import CORS
from routes.event_routes import init_app

app = Flask(__name__)

# CORS(app, resources={r"/*": {"origins": "http://160.251.212.124"}})
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
init_app(app)

if __name__ == '__main__':
    app.run(debug=False, host=os.getenv('FLASK_RUN_HOST', '0.0.0.0'), port=int(os.getenv('FLASK_RUN_PORT', 5000)))
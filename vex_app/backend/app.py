import logging
import os

from flask import Flask
from flask_cors import CORS
from routes.event_routes import init_app
from services.region_service import RegionService
from services.scraper_service import ScraperService


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": os.environ.get('CLIENT_ORIGIN')}})

    region_service = RegionService()
    scraper_service = ScraperService()
    init_app(app, region_service, scraper_service)
    return app

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    app = create_app()
    app.run(
        debug=False,
        host=os.getenv('FLASK_RUN_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_RUN_PORT', 5000))
    )

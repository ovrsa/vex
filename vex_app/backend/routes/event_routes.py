import logging

from flask import jsonify, request
from services.region_service import process_request_data, validate_data
from services.scraper import scrape_events

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def init_app(app):
    @app.route('/api', methods=['POST'])
    def scrape():
        logger.debug(f'Received request: {request.args}')
        data = request.json
        logger.debug(f'Request data: {data}')
        if not validate_data(data):
            return jsonify({'error': 'Invalid data'}), 400
        try:
            processed_data = process_request_data(data)
            scrape_data = scrape_events(processed_data)
            return jsonify({
                "data": scrape_data
            })
        except Exception as e:
            logger.error(f'Error processing request: {e}')
            return jsonify({'error': 'Internal server error'}), 500
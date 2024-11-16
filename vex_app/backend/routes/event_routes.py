import logging

from flask import jsonify, request

logger = logging.getLogger(__name__)


def init_app(app, region_service, scraper_service):
    """アプリケーションにルートを初期化する

    Args:
        app: Flaskアプリケーションインスタンス
        region_service: 地域情報サービス
        scraper_service: スクレイピングサービス
    """
    @app.route('/api', methods=['POST'])
    def scrape():
        """イベント情報をスクレイピングするエンドポイント

        Returns:
            tuple: JSONレスポンスとステータスコード
        """
        logger.debug(f'Received request: {request.args}')
        data = request.json
        logger.debug(f'Request data: {data}')

        if not region_service.validate_data(data):
            logger.error('Invalid data received')
            return jsonify({'error': 'Invalid data'}), 400

        try:
            processed_data = region_service.process_request_data(data)
            scraped_data = scraper_service.scrape_events(processed_data)
            return jsonify({"data": scraped_data})
        except Exception as e:
            logger.exception('Error processing request')
            return jsonify({'error': 'Internal server error'}), 500
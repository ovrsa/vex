import logging

from flask import jsonify, request
from services.region_service import process_request_data, validate_data
from services.scraper import scrape_events

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# エンドポイントの初期化
def init_app(app):
    # ルートの定義
    # POSTメソッドでのリクエストを受け付ける
    @app.route('/', methods=['POST'])
    # postリクエストを処理
    def scrape():
        logger.debug(f'Received request: {request.args}')
        """
        クライアントからのリクエストを取得
        抽出したイベント情報をJSON形式で返す
        """
        data = request.json
        logger.debug(f'Request data: {data}')
        # リクエストデータのバリデーション
        if not validate_data(data):
            return jsonify({'error': 'Invalid data'}), 400
        
        try:
            # サービス層での処理を呼び出し
            processed_data = process_request_data(data)
            # scraperでスクレイピング処理を呼び出し
            scrape_data = scrape_events(processed_data)
            # クライアントにJSON形式でイベント情報を返す
            return jsonify({
                "status": 'success',
                "data": scrape_data
            })
        except Exception as e:
            logger.error(f'Error processing request: {e}')
            return jsonify({'error': 'Internal server error'}), 500
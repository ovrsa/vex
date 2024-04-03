import json
import logging
import time

from flask import jsonify, request

from ..services.region_service import validate_data
from ..services.scraper import process_request_data

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
        # backend-1   | DEBUG:services.region_service:dob:2024-04-29T15:00:00.000Z
        # backend-1   | DEBUG:services.region_service:district:北海道(札幌市)
        data = request.json
        logger.debug(f'Request data: {data}')
        # リクエストデータのバリデーション
        if not validate_data(data):
            return jsonify({'error': 'Invalid data'}), 400
        
        try:
            # サービス層での処理を呼び出し
            processed_data = process_request_data(data)
            return jsonify({
                "status": 'success',
                "data": processed_data
            })
        except Exception as e:
            logger.error(f'Error processing request: {e}')
            return jsonify({'error': 'Internal server error'}), 500
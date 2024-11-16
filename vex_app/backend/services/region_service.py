import json
import logging
import os
from datetime import datetime

import pytz
from services.interfaces import IRegionService

logger = logging.getLogger(__name__)


class RegionService(IRegionService):
    """地域情報に関する操作を処理するサービスクラス"""

    def __init__(self):
        """RegionServiceの初期化

        地域データファイルのパスを設定し、初期データを読み込む
        """
        self.region_file_path = os.path.join(
            os.path.dirname(__file__),
            '..',
            'data',
            'region.json'
        )
        self.region_data = self._load_region_data()

    def _load_region_data(self):
        """JSONファイルから地域データを読み込む

        Returns:
            list: 地域データのリスト。読み込みに失敗した場合は空リストを返す
        """
        try:
            with open(self.region_file_path, 'r') as file:
                return json.load(file)
        except Exception as e:
            logger.exception('Error loading region data')
            return []

    def validate_data(self, data: dict) -> bool:
        """リクエストデータのバリデーション

        Args:
            data (dict): 検証するデータ

        Returns:
            bool
        """
        required_keys = ['district', 'selectedDate']
        if not isinstance(data, dict):
            logger.error('Data is not a dictionary')
            return False

        for key in required_keys:
            if key not in data:
                logger.error(f'Missing required key: {key}')
                return False
        return True

    def get_region_id(self, region_name: str) -> int:
        """地域名から地域IDを取得

        Args:
            region_name (str): 地域の名前

        Returns:
            int: 地域ID。見つからない場合はNone
        """
        for region in self.region_data:
            if region['label'] == region_name:
                return region['id']
        logger.warning(f'Region not found: {region_name}')
        return None

    def get_search_date(self, selected_date_str: str) -> str:
        """選択された日付文字列を検索用の日付形式に変換する

        Args:
            selected_date_str (str): UTC形式の日付文字列

        Returns:
            str: JST形式でフォーマットされた日付文字列。変換に失敗した場合はNone
        """
        try:
            utc_date = datetime.strptime(
                selected_date_str,
                '%Y-%m-%dT%H:%M:%S.%fZ'
            )
            jst_timezone = pytz.timezone('Asia/Tokyo')
            jst_date = utc_date.replace(tzinfo=pytz.utc).astimezone(jst_timezone)
            formatted_date = jst_date.strftime('%m%d')
            logger.debug(f'Converted date {selected_date_str} to {formatted_date}')
            return formatted_date
        except ValueError:
            logger.error(f'Invalid date format: {selected_date_str}')
            return None

    def process_request_data(self, data: dict) -> dict:
        """リクエストデータを処理する

        Args:
            data (dict): 処理するリクエストデータ

        Returns:
            dict: 処理済みデータ

        Raises:
            ValueError: 地域または日付が無効な場合
        """
        region_id = self.get_region_id(data['district'])
        if region_id is None:
            raise ValueError('Invalid region')

        search_date = self.get_search_date(data['selectedDate'])
        if search_date is None:
            raise ValueError('Invalid date')

        processed_data = {
            'region_id': region_id,
            'selected_date': data['selectedDate'],
            'search_date': search_date
        }
        logger.debug(f'Processed data: {processed_data}')
        return processed_data

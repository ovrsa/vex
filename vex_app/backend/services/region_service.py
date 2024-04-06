"""地域とIDの紐づけを行う"""
import json
import logging
import os
from datetime import datetime

import pytz

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

region_file_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'region.json')

def validate_data(data: dict) -> bool:
    """リクエストデータのバリデーション"""
    # TODO: Implement the validate_data function
    return True

def get_region_id(region_name):
    """
    地域名から地域IDを取得
    Args:
        region_name (str): 地域名
    Returns:
        int: 地域ID
    """
    with open(region_file_path, 'r') as f:
        region_data = json.load(f)
    for region in region_data:
        if region['label'] == region_name:
            return region['id']
    return None
        
def get_search_date(data: dict) -> str:
    """検索する日付を取得"""
    utc_dob_str = data['dob']
    utc_dob = datetime.strptime(utc_dob_str, '%Y-%m-%dT%H:%M:%S.%fZ')
    logger.debug(f'utc_dob:{utc_dob}')
    # UTCを日本時間に変更
    jst_timezone = pytz.timezone('Asia/Tokyo')
    jst_dob = utc_dob.replace(tzinfo=pytz.utc).astimezone(jst_timezone)
    # logger.debug(f'jst_dob:{jst_dob}')
    # 2024-04-04 00:00:00+09:00を0404の形式に変換
    dob = jst_dob.strftime('%m%d')
    logger.debug(f'dob:{dob}')
    return dob

def process_request_data(data: dict) -> dict:
    """リクエストデータを処理"""
    processed_data = {}
    # リージョンのIDを取得
    region_id = get_region_id(data['district'])
    logger.debug(f'region_id:{region_id}')
    processed_data['region_id'] = region_id
    # 検索する日付を取得
    processed_data['dob'] = data['dob']
    # mmddの形式に変換
    processed_data['search_date'] = get_search_date(data)
    logger.debug(f'processed_data:{processed_data}')
    return processed_data

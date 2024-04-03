"""地域とIDの紐づけを行う"""
import json
import logging

from ..data import region

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def get_region_id(region_name):
    """
    地域名から地域IDを取得
    Args:
        region_name (str): 地域名
    Returns:
        int: 地域ID
    """
    with region.open() as f:
        region_data = json.load(f)
        logger.debug(f'Region data: {region_data}')
        
def validate_data(data: dict) -> bool:
    """リクエストデータのバリデーション"""
    return True

def process_request_data(data: dict) -> dict:
    """リクエストデータを処理"""
    processed_data = {}
    region_id = get_region_id(data['region'])
    processed_data['region_id'] = region_id
    return processed_data

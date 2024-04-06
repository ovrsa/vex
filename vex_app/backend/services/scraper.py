import logging
import urllib.request
import uuid
from typing import Optional

from bs4 import BeautifulSoup
from flask import Flask
from flask_cors import CORS

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

def scrape_events(data: dict):
    """
    イベント情報をスクレイピング
    Args:
        data (dict): リクエストデータ
    Returns:
        None
    """
    # URLの作成
    url = f'https://www.walkerplus.com/event_list/{data["search_date"]}/{data["region_id"]}/'
    html = fetch_html(url)
    # イベント情報の抽出
    events_dict = extract_event_info(html)
    # イベントの詳細情報を取得
    fetch_event_details(events_dict)
    # クライアントにJSON形式でイベント情報を返す
    logger.debug(f'Events: {events_dict}')
    return events_dict


def fetch_html(url: str) -> Optional[bytes]:
    """
    指定されたURLからHTMLを取得
    Args:
        取得するHTMLのURL
    Returns:
        bytes: HTMLコンテンツ。エラーが発生した場合はNoneを返す。
    """
    try:
        with urllib.request.urlopen(url) as response:
            return response.read()
    except Exception as e:
        logger.error(f'Error fetching the URL: {e}')
        return None


def extract_event_info(html: bytes) -> dict:
    """
    HTMLからイベント情報を抽出
    Args:
        html (bytes): 解析するHTMLコンテンツ
    Returns:
        dict: イベント情報を含む辞書
    """
    soup = BeautifulSoup(html, 'html.parser')
    items = soup.find_all('div', class_='m-mainlist-item')
    events_dict = {}
    for item in items:
        event_uid = str(uuid.uuid4())
        event_info = parse_event_item(item)
        events_dict[event_uid] = event_info
    return events_dict


def parse_event_item(item: BeautifulSoup) -> dict:
    """
    個々のイベントアイテムから詳細情報を抽出
    Args:
        item (bs4.element.Tag): イベントアイテムを表すBeautifulSoupオブジェクト
    Returns:
        dict: イベントの詳細情報
    """
    # イベントのリンクと画像のURLを抽出
    txt_tag = item.find('a', class_='m-mainlist-item__txt')
    event_link = txt_tag.get('href') if txt_tag else None
    # イベントの画像のURLを抽出
    img_tag = item.find('a', class_='m-mainlist-item__img').find('img')
    img_src = img_tag.get('src') if img_tag else None
    return {
        'event_link': event_link,
        'map_link': 'https://www.walkerplus.com' + event_link + 'map.html' if event_link else None,
        'price_link': 'https://www.walkerplus.com' + event_link + 'price.html' if event_link else None,
        'image_src': img_src,
    }


def fetch_event_details(events_dict: dict):
    """
    イベントの詳細情報を取得
    Args:
        events_dict (dict): イベント情報を含む辞書
    Returns:
        None
    """
    for uid, event in events_dict.items():
        if event['map_link']:
            html = fetch_html(event['map_link'])
            if html:
                parse_event_details(html, event)
        if event['price_link']:
            html = fetch_html(event['price_link'])
            if html:
                parse_price_details(html, event)


def parse_event_details(html: bytes, event: dict):
    """
    イベントの詳細情報をHTMLから抽出
    Args:
        html (bytes): 解析するHTMLコンテンツ
        event (dict): 更新するイベント情報
    """
    soup = BeautifulSoup(html, 'html.parser')
    detail_header = soup.find('h1', class_='m-detailheader-heading__ttl')
    event['event_name'] = detail_header.get_text(
        strip=True) if detail_header else 'Event name not found'
    info_table = soup.find('table', class_='m-infotable__table')
    if info_table:
        for row in info_table.find_all('tr', class_='m-infotable__row'):
            th = row.find('th', class_='m-infotable__th')
            td = row.find('td', class_='m-infotable__td')
            if th and td:
                key = th.get_text(strip=True)
                # <a>タグを探す
                a_tag = td.find('a')
                if a_tag and a_tag.has_attr('href'):
                    # <a>タグが存在し、href属性がある場合、リンクをvalueに設定
                    value = a_tag['href']
                else:
                    # <a>タグがない場合、またはhref属性がない場合、テキストをvalueに設定
                    value = ' '.join(td.stripped_strings)
                event[key] = value
    else:
        logger.debug('Info table not found')


def parse_price_details(html: bytes, event: dict):
    """
    イベントの価格情報をHTMLから抽出
    Args:
        html (bytes): 解析するHTMLコンテンツ
        event (dict): 更新するイベント情報
    """
    soup = BeautifulSoup(html, 'html.parser')
    price_table = soup.find('table', class_='m-infotable__table')
    if price_table:
        for row in price_table.find_all('tr', class_='m-infotable__row'):
            th = row.find('th', class_='m-infotable__th')
            td = row.find('td', class_='m-infotable__td')
            if th and td:
                key = th.get_text(strip=True)
                a_tag = td.find('a')
                if a_tag and a_tag.has_attr('href'):
                    value = a_tag['href']
                else:
                    value = ' '.join(td.stripped_strings)
                event[key] = value
    else:
        logger.debug('Price table not found')



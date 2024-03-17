from flask import Flask, request
from bs4 import BeautifulSoup
import urllib.request
import json
import logging
import uuid

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)


@app.route('/scrape')
def scrape():
    # URLパラメータからURLを取得
    url = request.args.get('url')
    if not url:
        return 'URL query parameter is missing', 400
    logger.debug(f'Requested URL: {url}')

    try:
        # URLを開いてHTMLを取得
        # url=https://www.walkerplus.com/event_list/0315/ar0313/
        with urllib.request.urlopen(url) as response:
            html = response.read()
            # HTMLを文字列に変換
    except Exception as e:
        logger.error(f'Error fetching the URL: {e}')
        return 'Error fetching the URL', 500

    logger.debug(f'HTML snippet: {html[:500]}')

    # 地区のイベント情報を取得
    soup = BeautifulSoup(html, 'html.parser')

    items = soup.find_all('div', class_='m-mainlist-item')

    # イベント情報を格納するための辞書
    events_dict = {}

    # イベントの一覧情報を取得
    for item in items:
        txt_tag = item.find('a', class_='m-mainlist-item__txt')
        if txt_tag:
            event_link = txt_tag.get('href')
            logger.debug(f'Event link: {event_link}')
        else:
            logger.debug('Event text link tag not found')

        # イベントの画像を取得
        img_tag = item.find('a', class_='m-mainlist-item__img').find('img')
        img_src = img_tag.get('src') if img_tag else None
        logger.debug(f'Image source: {img_src}')

        event_uid = str(uuid.uuid4())
        event_info = {
            'map_link': 'https://www.walkerplus.com' + event_link + 'map.html',
            'price_link': 'https://www.walkerplus.com' + event_link + 'price.html',
            'image_src': img_src,
        }
        events_dict[event_uid] = event_info

    # map.htmlからイベントの詳細情報を取得
    for uid, event in events_dict.items():
        map_link = event['map_link']
        logger.debug(f'Fetching_map_link: {map_link}')
        with urllib.request.urlopen(map_link) as response:
            html = response.read()
        soup = BeautifulSoup(html, 'html.parser')

        detail_header = soup.find('h1', class_='m-detailheader-heading__ttl')
        if detail_header:
            event_name = detail_header.get_text(strip=True)
            event['event_name'] = event_name
            logger.debug(f'Event name: {event_name}')
        else:
            logger.debug('Event name not found')
            event['event_name'] = 'Event name not found'

        info_table = soup.find('table', class_='m-infotable__table')
        if info_table:
            for row in info_table.find_all('tr', class_='m-infotable__row'):
                th = row.find('th', class_='m-infotable__th')
                td = row.find('td', class_='m-infotable__td')
                if th and td:
                    key = th.get_text(strip=True)
                    value = ' '.join(td.stripped_strings)
                    event[key] = value
        else:
            logger.debug('Info table not found')

        logger.debug(f'Event info: {event}')

    # price.htmlからイベントの料金情報を取得
    for uid, event in events_dict.items():
        price_link = event['price_link']
        logger.debug(f'Fetching_price_link: {price_link}')
        with urllib.request.urlopen(price_link) as response:
            html = response.read()
        soup = BeautifulSoup(html, 'html.parser')

        price_table = soup.find('table', class_='m-infotable__table')
        if price_table:
            for row in price_table.find_all('tr', class_='m-infotable__row'):
                th = row.find('th', class_='m-infotable__th')
                td = row.find('td', class_='m-infotable__td')
                if th and td:
                    key = th.get_text(strip=True)
                    value = ' '.join(td.stripped_strings)
                    event[key] = value
        else:
            logger.debug('Price table not found')

        logger.debug(f'Event info: {event}')

    logger.debug(f'Events: {json.dumps(events_dict, ensure_ascii=False)}')
    return json.dumps(events_dict, ensure_ascii=False)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

import logging
import urllib.request
import uuid
from typing import Dict, Optional

from bs4 import BeautifulSoup
from services.interfaces import IScraperService

logger = logging.getLogger(__name__)


class ScraperService(IScraperService):
    """スクレイピングに関するサービスクラス。"""

    BASE_URL = 'https://www.walkerplus.com'

    def scrape_events(self, data: dict) -> dict:
        """イベント情報をスクレイピングする。

        Args:
            data (dict): スクレイピングに必要なデータ

        Returns:
            dict: スクレイピングしたイベント情報
        """
        url = f'{self.BASE_URL}/event_list/{data["search_date"]}/{data["region_id"]}/'
        html = self._fetch_html(url)
        if html is None:
            logger.error(f'Failed to fetch HTML from {url}')
            return {}

        events = self._extract_event_info(html)
        self._fetch_event_details(events)
        logger.debug(f'Scraped events: {events}')
        return events

    def _fetch_html(self, url: str) -> Optional[bytes]:
        """指定されたURLからHTMLを取得する。

        Args:
            url (str): 取得対象のURL

        Returns:
            Optional[bytes]: 取得したHTML。失敗時はNone
        """
        try:
            with urllib.request.urlopen(url) as response:
                return response.read()
        except Exception as e:
            logger.error(f'Error fetching the URL {url}: {e}')
            return None

    def _extract_event_info(self, html: bytes) -> Dict[str, dict]:
        """HTMLからイベント情報を抽出する。

        Args:
            html (bytes): 解析対象のHTML

        Returns:
            Dict[str, dict]: イベント情報の辞書
        """
        soup = BeautifulSoup(html, 'html.parser')
        items = soup.find_all('div', class_='m-mainlist-item')
        events = {}
        for item in items:
            event_id = str(uuid.uuid4())
            event_info = self._parse_event_item(item)
            events[event_id] = event_info
        return events

    def _parse_event_item(self, item) -> dict:
        """イベントアイテムから情報を抽出する。

        Args:
            item: BeautifulSoupオブジェクト

        Returns:
            dict: 抽出したイベント情報
        """
        txt_tag = item.find('a', class_='m-mainlist-item__txt')
        event_link = txt_tag.get('href') if txt_tag else None
        img_tag = item.find('a', class_='m-mainlist-item__img')
        img_src = (
            img_tag.find('img').get('src')
            if img_tag and img_tag.find('img')
            else None
        )

        return {
            'event_link': event_link,
            'map_link': (
                f'{self.BASE_URL}{event_link}map.html'
                if event_link else None
            ),
            'price_link': (
                f'{self.BASE_URL}{event_link}price.html'
                if event_link else None
            ),
            'image_src': img_src,
        }

    def _fetch_event_details(self, events: Dict[str, dict]) -> None:
        """イベントの詳細情報を取得する。

        Args:
            events (Dict[str, dict]): イベント情報の辞書
        """
        for uid, event in events.items():
            if event.get('map_link'):
                html = self._fetch_html(event['map_link'])
                if html:
                    self._parse_event_details(html, event)
                    self._parse_table_details(html, event)
                else:
                    logger.warning(f'Failed to fetch map page for event {uid}')
            else:
                logger.warning(f'No map link for event {uid}')

            if event.get('price_link'):
                html = self._fetch_html(event['price_link'])
                if html:
                    self._parse_table_details(html, event)
                else:
                    logger.warning(f'Failed to fetch price page for event {uid}')
            else:
                logger.warning(f'No price link for event {uid}')

    def _parse_event_details(self, html: bytes, event: dict) -> None:
        """イベントの詳細情報を抽出する。

        Args:
            html (bytes): 解析対象のHTML
            event (dict): イベント情報を格納する辞書
        """
        soup = BeautifulSoup(html, 'html.parser')
        header = soup.find('h1', class_='m-detailheader-heading__ttl')
        event['event_name'] = (
            header.get_text(strip=True)
            if header
            else 'Event name not found'
        )

    def _parse_table_details(self, html: bytes, event: dict) -> None:
        """イベントの詳細情報をテーブルから抽出する。

        Args:
            html (bytes): 解析対象のHTML
            event (dict): イベント情報を格納する辞書
        """
        soup = BeautifulSoup(html, 'html.parser')
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

from flask import Flask, request
from bs4 import BeautifulSoup
import urllib.request
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)


# scrapeしたいURLを受け取って、タイトルを返すエンドポイント
@app.route('/scrape')
def scrape():
    # スクレイピングしたいURL
    url = request.args.get('url')
    # URLが不正の場合はエラーを返す
    if not url:
        return 'URL query parameter is missing', 400

    # URLからHTMLを取得
    with urllib.request.urlopen(url) as response:
        html = response.read()

    # BeautifulSoupオブジェクトを作成
    soup = BeautifulSoup(html, 'html.parser')

    # soupの内容をコンソールに出力
    logger.debug(soup.prettify())

    # タイトルタグのテキストを取得
    title = soup.title.string
    body = soup.body.string

    return f'Title: {title} Body: {body}'


# デバッグモードでアプリケーションを起動
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

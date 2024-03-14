from flask import Flask, request
# HTMLやXMLファイルから情報を抽出するためのライブラリ
from bs4 import BeautifulSoup
# URLを開いてHTMLを取得するためのライブラリ
import urllib.request
import json
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Flaskのインスタンスを作成
app = Flask(__name__)


# エンドポイントのURLを指定してイベント情報を取得するエンドポイントを作成
@app.route('/scrape')
def scrape():
    # URLを取得
    url = request.args.get('url')
    if not url:
        return 'URL query parameter is missing', 400

    # URLを開いてHTMLを取得
    with urllib.request.urlopen(url) as response:
        # HTMLの情報を取得
        html = response.read()

    # BeautifulSoupを使ってHTMLをパース
    soup = BeautifulSoup(html, 'html.parser')
    # スクリプトタグ内のJSONデータを取得
    script = soup.find('script', type='application/ld+json')
    if not script:
        return 'Event data not found', 404
    # JSONデータをパース
    data = json.loads(script.string)

    # スクリプトのタグから必要な情報を抽出
    event_name = data.get('name')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    location_name = data['location'].get('name')
    address = data['location']['address'].get('streetAddress')

    # 情報をHTML形式で出力
    output = f"""
    <html>
        <head><title>Event Information</title></head>
        <body>
            <h1>{event_name}</h1>
            <p>Start Date: {start_date}</p>
            <p>End Date: {end_date}</p>
            <p>Location Name: {location_name}</p>
            <p>Address: {address}</p>
        </body>
    </html>
    """
    return output


# TODO：本番環境ではデバッグモードを無効にする
# デバッグモードでFlaskアプリケーションを起動
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

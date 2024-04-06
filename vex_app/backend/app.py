"""エントリーポイント"""
from flask import Flask
from flask_cors import CORS
# region_serviceのインポートを修正
from routes.event_routes import init_app

# Flaskアプリケーションの初期化
app = Flask(__name__)
# CORSモジュールの初期化
# CORS（Cross-Origin Resource Sharing）の設定: CORS(app)を呼び出すことで、作成したアプリケーションにCORSポリシーを適用
# これにより、異なるオリジン（ドメイン、スキーム、ポート）からのリクエストを許可し、
# フロントエンドとバックエンドが異なるオリジンでホストされている場合でも、リソースの共有が可能になる
CORS(app)
# region_serviceの初期化関数を呼び出し
init_app(app)
# エントリーポイントの定義
if __name__ == '__main__':
    # デバッグモードでアプリケーションを起動
    app.run(debug=True, host='0.0.0.0')
# ローカルでの環境構築

## 前提条件

1. **Docker**  
   - バージョン: 4.28.0がインストール済みであること。

2. **Google Maps API**  
   - APIキーを作成済みであること。

3. **Supabase**  
   - アカウントを作成し、プロジェクトを作成済みであること。

## 手順

1. **プロジェクトディレクトリに移動**  
   `/vex_app` ディレクトリに移動します。

2. **Dockerコンテナの起動**  
   以下のコマンドを実行して、Dockerコンテナをビルドおよび起動する。

   ```bash
   docker-compose up --build
   ```

3. **環境変数の設定**  
   必要なアカウント情報とキーを作成し、`.env` ファイルに追加。

   ```env
   VITE_APP_GOOGLE_MAPS_API_KEY = {VITE_APP_GOOGLE_MAPS_API_KEY}
   VITE_SUPABASE_URL = {VITE_SUPABASE_URL}
   VITE_SUPABASE_API_KEY = {VITE_SUPABASE_API_KEY}
   ```
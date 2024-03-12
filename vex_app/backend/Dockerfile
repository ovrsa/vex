# Pythonの公式イメージをベースにする
FROM python:3.9
# アプリケーションの作業ディレクトリを設定
WORKDIR /app
# アプリケーションの依存関係ファイルをコピー
COPY requirements.txt /app/
# 依存関係をインストール
RUN pip install --no-cache-dir -r requirements.txt
# アプリケーションのソースコードをコピー
COPY . /app
# アプリケーションを起動
CMD ["flask", "run", "--host=0.0.0.0"]
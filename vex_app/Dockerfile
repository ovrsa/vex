# Node.jsの公式イメージをベースにする
FROM node:18
# アプリケーションの作業ディレクトリを設定
WORKDIR /app
# package.jsonとpackage-lock.jsonをコンテナのルートディレクトリにコピー
COPY package*.json ./
# アプリケーションの依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .
# アプリケーションを起動
CMD ["npm", "run", "dev"]

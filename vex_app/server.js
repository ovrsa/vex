// バックエンドのサーバーを立ち上げる

import express from "express";
import cors from "cors";

// サーバーの設定
const app = express();
const port = 3001;

// クロスオリジンの設定
app.use(cors());

// ルートの設定、ひとまずhello worldを返す
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// サーバーを立ち上げる
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

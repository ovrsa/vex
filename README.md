## 概要 
地名と日付を入力してボタンを押すと、ローカルイベントの情報をmap上に描画する

## 機能紹介
イベント情報検索機
- webスクレイピング
- Googlemapにピンを立ててイベント情報を表示
- Googlemap上にイベントの詳細情報をウィンドウ表示


## 使用画面
![action](https://github.com/user-attachments/assets/cf27fa4f-4b77-4f1a-a6d7-81a73b35d0dd)
| Login | ~~Signup~~<br>アクセス増につき廃止 | Home |
| :---: | :---: | :---: |
| ![Login](https://github.com/user-attachments/assets/2921aeef-beb2-4d65-8953-cadd3d4f39fe) | ![Signup](https://github.com/user-attachments/assets/e7744a0b-8562-421d-a7ec-f795549fd390) | ![Home](https://github.com/user-attachments/assets/209debf2-fd8a-45e6-a642-e2e10089c94b) |
| Loginを実施 | ~~Signupを実施~~ | イベント情報の取得 |
| Google | ~~Google~~ | 地名 |
| Email | ~~Email~~ | 日付をCalendarから選択 |

## 実行環境の構築
https://github.com/ovrsa/vex/tree/master/vex_app

## Architecture
![Architecture](https://github.com/user-attachments/assets/28c63ac4-7f9c-47da-b2b8-1e7a81b2635d)

## 使用技術
### Infrastructure
- Docker
- Docker Compose

### Frontend:
- vite: ^5.1.4
- vitest": ^2.1.5
- react: ^18.2.0
- typescript: ^5.2.2
- react-router-dom: ^6.3.0
- shadcn: ^1.1.0
- GooglemapsJs-api: ^1.16.1
- axios: ^0.27.2
- recoil: ^0.7.7
- recoil-persist: ^5.1.0
- tailwindcss: ^2.2.1
- vaul: ^0.9.0
- zod: ^3.22.4
- supabase-js: ^2.42.5
- cors: ^2.8.5

### Backend:
- python: 3.9
- Flask: 3.0.2
- requests: 2.26.0
- beautifulsoup4: 4.10.0
- Werkzeug: 2.0
- flask-cors: 3.0.10
- pytz: 2022.1

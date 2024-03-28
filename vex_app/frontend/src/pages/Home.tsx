import { ComboboxForm } from '@/components/comboboxFrom';
import { Calendar } from "@/components/ui/calendar";
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const containerStyle = {
  width: '800px',
  height: '800px'
};

// 東京タワーの位置情報
const tokyoTower = {
  lat: 35.6585805,
  lng: 139.7454329
};

const Home = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  // リクエストに載せるURL
  const [url, setUrl] = useState('');
  // ユーザーがクリックした際に発火
  const handleSubmit = async(e:React.FormEvent) => {
    //フォームのデフォルト送信を防ぐ
    e.preventDefault(); 
    try{
      // 指定したURL宛にHTTP POSTを送信
      // ボディにはスクレイプ用のURLを含める
      // TODO: URLの渡し方について、地名と日付で動的に変えられるように調整
      // awaitで非同期リクエストが終わるまで待機
      // 終了後、response.data(JSON)で値を取得
      const response = await axios.post('http://localhost:5001/scrape', JSON.stringify({ url: url }), {
        headers: {
          // JSON形式であることを指定
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data to the backend', error);
    }
  };

  // useStateでGoogleMapに表示した内容を保持
  const [map, setMap] = useState<google.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);
  // useEffectでコンポーネントがマウントされた際に処理を実行
  // googlemaps/js-api-loaderのLoaderを使用
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY, 
      version: "weekly",
    });

    // GoogleMapAPIを非同期にロード
    // このメソッドはPromiseを返すので、.then()使用してロードされたあとの処理を記述できる
    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: tokyoTower,
          zoom: 15,
        });

        // マーカーを作成
        const marker = new google.maps.Marker({
          position: tokyoTower,
          map: map,
          title: "東京タワー"
        });

        // 情報ウィンドウの内容
        const contentString = 
          '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">東京タワー</h1>' +
          '<div id="bodyContent">' +
          '<p><b>東京タワー</b>は、日本の東京都港区にある電波塔です。' +
          '高さは333メートルで、日本の電波塔としては2番目に高い建築物です。</p>' +
          '<p>詳細: <a href="https://ja.wikipedia.org/wiki/%E6%9D%B1%E4%BA%AC%E3%82%BF%E3%83%AF%E3%83%BC">' +
          'Wikipedia</a> ' +
          '(最終訪問: 2023年4月1日).</p>' +
          '</div>' +
          '</div>';

        // 情報ウィンドウを作成
        const infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        // マーカーをクリックしたときに情報ウィンドウを表示する
        marker.addListener("click", () => {
          // .open()でマーカーがクリックされた際に情報ウィンドウが開くように調整
          infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
          });
        });

        // setMap():作成したオブジェクトをmapStateに格納
        setMap(map);
      }
    });
    // TODO: useEffectでユーザーが情報をSubmitした際にマウントするように設定
  }, []);

  return (
    <div>
    <ComboboxForm />
    <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-md border"
    />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to scrape"
        />
        <button type="submit">Submit</button>
      </form>
      <div ref={mapRef} style={containerStyle} />
    </div>
  );
};

export default Home;

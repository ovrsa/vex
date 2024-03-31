import { DatePickerForm } from "@/components/DatePickerForm";
import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useRef, useState } from 'react';


// 東京タワーの位置情報
const tokyoTower = {
  lat: 35.6585805,
  lng: 139.7454329
};

const Home = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

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
          // '<p>詳細: <a href="https://ja.wikipedia.org/wiki/%E6%9D%B1%E4%BA%AC%E3%82%BF%E3%83%AF%E3%83%BC">' +
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
      <DatePickerForm />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}} ref={mapRef} />
    </div>
  );
};
export default Home


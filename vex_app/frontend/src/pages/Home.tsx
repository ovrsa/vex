import { DatePickerForm } from "@/components/DatePickForm";
import Logout from "@/components/Logout";
import useEventData from "@/hooks/useEventData";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';


// 初期値
const tokyoTower = {
  lat: 35.65861,
  lng: 139.74556
};

type EventDetails = {
  event_name: string;
  住所: string;
  公式サイト: string;
  料金: string;
  開催日: string;
  開催時間: string;
  駐車場: string;
}

type EventData = {
  data: {
    [key: string]: EventDetails;
  };
  status: string;
}

const Home = () => {
  // useStateでGoogleMapに表示した内容を保持
  const [map, setMap] = useState<google.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);
  const [eventsData, setEventsData] = useState<any[]>([]);

  // useEffectでコンポーネントがマウントされた際に処理を実行
  const handleFormSubmit = (data: any) => {
    setEventsData([...eventsData, data]);
  }

  useGoogleMap(import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY, mapRef, tokyoTower);
  useEventData();
  // googlemaps/js-api-loaderのLoaderを使用
  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY, 
      version: "weekly",
    });
    // GoogleMapAPIを非同期にロード
    // このメソッドはPromiseを返すので.thenを使用してロードされたあとの処理を記述
    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          // 座標は検索した地域の緯度経度を指定
          center: tokyoTower,
          zoom: 11,
        });
        // setMap():作成したオブジェクトをmapStateに格納
        setMap(map);
        // Sessionストレージからイベントデータを取得
        const storedEvents = sessionStorage.getItem('eventsData');
        if (storedEvents) {
          const eventsData = JSON.parse(storedEvents);
          setEventsData(eventsData);
        }
      }
    });
    // TODO: useEffectでユーザーが情報をSubmitした際にマウントするように設定
  }, []);
  
  useEffect(() => {
    if (map && eventsData.length > 0) {
      // geocoderを使用して住所から緯度経度を取得
      const geocoder = new google.maps.Geocoder();
      eventsData.forEach((event: EventData) => {
        Object.values(event.data).forEach((eventDetails: EventDetails) => {
          const address = eventDetails['住所'];
          const event_name = eventDetails.event_name;
          const webSite = eventDetails['公式サイト'];
          const entry = eventDetails['料金'];
          const date = eventDetails['開催日'];
          const time = eventDetails['開催時間'];
          const parking = eventDetails['駐車場'];
          if (address) {
            geocoder.geocode({ address: address }, (results, status) => {
              if (status === 'OK' && results && results[0]) {
                  map.setCenter(results[0].geometry.location);
                  const marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: eventDetails.event_name,
                  });
                  // InfoWindowの内容を設定
                  const infowindow = new google.maps.InfoWindow({
                    content: `<div style="font-family: Arial, sans-serif; font-size: 11px;">
                                <div style="display: flex; margin-bottom: 4px;"><span style="min-width: 80px; font-weight: bold;">title</span><span>${event_name}</span></div>
                                <div style="display: flex; margin-bottom: 4px;"><span style="min-width: 80px; font-weight: bold;">address</span><span>${address}</span></div>
                                <div style="display: flex; margin-bottom: 4px;"><span style="min-width: 80px; font-weight: bold;">URL</span><span><a href="${webSite}" target="_blank" rel="noopener noreferrer" style="color: blue;">${webSite}</a></span></div>
                                <div style="display: flex; margin-bottom: 4px;"><span style="min-width: 80px; font-weight: bold;">date</span><span>${date}</span></div>
                                <div style="display: flex; margin-bottom: 4px;"><span style="min-width: 80px; font-weight: bold;">entry</span><span>${entry}</span></div>
                                <div style="display: flex; margin-bottom: 4px;"><span style="min-width: 80px; font-weight: bold;">time</span><span>${time}</span></div>
                                <div style="display: flex;"><span style="min-width: 80px; font-weight: bold;">parking</span><span>${parking}</span></div>
                              </div>`,
                  });
                // マーカーをクリックしたときにInfoWindowを開く
                marker.addListener("click", () => {
                  infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                  });
                });
              } else {
                console.error('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
        });
      });
    }
    // イベントデータをセッションストレージに保存
    sessionStorage.setItem('eventsData', JSON.stringify(eventsData));
    // TODO: 画面をリロードするとマーカーが消えてしまうので、リロードしてもマーカーが消えないように設定
  }, [map, eventsData]);

  return (
    <div>
      <div style={{ position: 'relative', height: '40vh' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, padding: '20px' }}>
          <Logout />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <DatePickerForm onFormSubmit={handleFormSubmit} />
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh'}} ref={mapRef} />
    </div>
  );
};
export default Home
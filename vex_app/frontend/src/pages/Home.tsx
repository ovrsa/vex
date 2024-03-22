import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';

const containerStyle = {
  width: '800px',
  height: '800px'
};

const center = {
  lat: 35.6895,
  lng: 139.6720
};

const Home = () => {
  // useStateでmapの状態を保持
  const [map, setMap] = useState<google.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);

  // コンポーネントがマウントされたあとにGooglemapを非同期にロード
  useEffect(() => {
    const loader = new Loader({
      apiKey: "",
      version: "weekly",
    });

    // Loaderインスタンスを作成し、APIを非同期にロード
    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center,
          zoom: 10,
        });
        // APIがロードされた後、mapRefで参照されるdiv要素に新たな地図を作成
        // setMapを使用してmapの状態を更新
        setMap(map);
      }
    });
  }, []);

  return (
    <div>
        {/* レンダリング */}
      <div ref={mapRef} style={containerStyle} />
      {/* 他のコンテンツ */}
    </div>
  );
};

export default Home;

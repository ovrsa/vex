import { Loader } from '@googlemaps/js-api-loader';
import { RefObject, useEffect, useState } from 'react';

export const useGoogleMap = (
    apiKey: string,
    mapRef: RefObject<HTMLDivElement>,
    initialPosition: { lat: number; lng: number }
    ) => {
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: initialPosition,
          zoom: 11,
        });
        setMap(map);
      }
    });
  }, [apiKey, mapRef, initialPosition]);

  return map;
};
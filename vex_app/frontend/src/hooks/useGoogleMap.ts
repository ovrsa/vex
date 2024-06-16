import { Loader } from '@googlemaps/js-api-loader';
import { RefObject, useEffect, useState } from 'react';

export const useGoogleMap = (
    apiKey: string,
    mapRef: RefObject<HTMLDivElement>,
    initialPosition: { lat: number; lng: number },
    eventsData: any[]
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

        if (eventsData.length > 0) {
          const geocoder = new google.maps.Geocoder();
          eventsData.forEach((event: any) => {
            const address = event.address;
            if (address) {
              geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    title: event.title,
                  });
                }
              });
            }
          });
        }
      }
    });
  }, [apiKey, mapRef, initialPosition, eventsData]);

  return map;
};
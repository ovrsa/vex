import { Progress } from "@/components/ui/progress";
import { useGoogleMap } from "@/hooks/useGoogleMap";
import { eventDataState } from "@/state/authState";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { ResetMapButton } from "./ResetMapButton";



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

export const GoogleMap = ({eventsData}: {eventsData: any[]}) => {
    /**
     * GoogleMapに表示するイベントデータを管理
     */
  const [storedEvents, setStoredEvents] = useRecoilState(eventDataState);
  const mapRef = useRef<HTMLDivElement>(null);
  const map = useGoogleMap(import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY, mapRef, tokyoTower, eventsData);
  useEffect(() => {
    setStoredEvents(eventsData);
    if (map && eventsData.length > 0) {
      const geocoder = new google.maps.Geocoder();
      eventsData.forEach((event: EventData) =>{
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
                  // 地図上のマーカーにInfoWindowを追加
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
  }, [map, eventsData]);

  return (
    <div>

      <div className="flex justify-end">
        <ResetMapButton />
      </div>

      <div ref={mapRef} style={{ height: "80vh", width: "100%" }}>
        <Progress value={33} />
      </div>

    </div>
  )
}
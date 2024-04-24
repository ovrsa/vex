import { useEffect, useState } from 'react';

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


const useEventData = () => {
  const [eventsData, setEventsData] = useState<EventData[]>([]);

  useEffect(() => {
    const storedEvents = sessionStorage.getItem('eventsData');
    if (storedEvents) {
      setEventsData(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('eventsData', JSON.stringify(eventsData));
  }, [eventsData]);

  return [eventsData, setEventsData] as const;
};
export default useEventData;
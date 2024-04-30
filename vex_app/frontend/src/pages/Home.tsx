import { DatePickerForm } from "@/components/DatePickForm";
import { DropDownMenu } from "@/components/DropDownMenu";
import { GoogleMap } from "@/components/GoogleMap";
import { HomeIcon } from "@/components/HomeIcon";
import { eventDataState } from "@/state/authState";

import { useRecoilState } from "recoil";


export const Home = () => {
  /**
   * フォームから送信されたイベントデータを管理
   * GoogleMapに表示
   */
  const [eventsData, setEventsData] = useRecoilState(eventDataState);

  const handleFormSubmit = (data: any) => {
    setEventsData([...eventsData, data]);
  }
  
  return (
    <div style={{ position: 'relative', height: '130vh', background: 'linear-gradient(to bottom right, #F5F6FF, #F5F6FF)' }}>

      <div style={{  position: 'absolute', top: 0, padding: '20px' }}>
        <HomeIcon />
      </div>

      <div style={{  position: 'absolute', right: 0, top: 0, padding: '20px' }}>
        <DropDownMenu />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '40vh', paddingTop: '110px' }}>  
        <DatePickerForm onFormSubmit={handleFormSubmit} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>  
        <div style={{ width: '100%', maxWidth: '900px' }}>
          <GoogleMap eventsData={eventsData} />
        </div>
      </div>
  
    </div>
  );
};
export default Home
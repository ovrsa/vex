import { DatePickerForm } from "@/components/DatePickForm";
import { DropDownMenu } from "@/components/DropDownMenu";
import { GoogleMap } from "@/components/GoogleMap";
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

      {/* account */}
      <div style={{  position: 'absolute', right: 0, top: 0, padding: '20px' }}>
        <DropDownMenu />
      </div>
  
      {/* DatePickerForm */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '40vh', paddingTop: '120px' }}>  
        <DatePickerForm onFormSubmit={handleFormSubmit} />
      </div>
  
      {/* GoogleMap */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>  
        <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
          <GoogleMap eventsData={eventsData} />
        </div>
      </div>
  
    </div>
  );
};
export default Home
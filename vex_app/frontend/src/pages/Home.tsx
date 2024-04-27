import { DatePickerForm } from "@/components/DatePickForm";
import { GoogleMap } from "@/components/GoogleMap";
import { Logout } from "@/components/Logout";
import { useState } from "react";


export const Home = () => {
  /**
   * フォームから送信されたイベントデータを管理
   * GoogleMapに表示
   */
  const [eventsData, setEventsData] = useState<any[]>([]);

  const handleFormSubmit = (data: any) => {
    setEventsData([...eventsData, data]);
  }
  
  return (
    <div style={{ position: 'relative', height: '40vh' }}>

      {/* account */}
      <div style={{ position: 'absolute', right: 0, top: 0, padding: '20px' }}>
        <Logout />
      </div>

      {/* DatePickerForm */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <DatePickerForm onFormSubmit={handleFormSubmit} />
      </div>

      {/* GoogleMap */}
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', paddingTop: '100px'}}>
        <GoogleMap eventsData={eventsData} />
      </div>

    </div>
  );
};
export default Home
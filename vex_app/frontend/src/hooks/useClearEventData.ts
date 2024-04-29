import { eventDataState } from '@/state/authState';
import { useResetRecoilState } from 'recoil';

export const useClearEventData = () => {
    const resetEventData = useResetRecoilState(eventDataState);
    
    const clearEventData = () => {
        resetEventData();
        
        const persistedData = localStorage.getItem('recoil-persist');
        if (persistedData) {
            const data = JSON.parse(persistedData);
            delete data[eventDataState.key];
            localStorage.setItem('recoil-persist', JSON.stringify(data));
        }
    };

    return clearEventData;
};
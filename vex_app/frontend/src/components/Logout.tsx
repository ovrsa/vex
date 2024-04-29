import { useClearEventData } from '@/hooks/useClearEventData';
import { supabase } from '@/lib/utils';
import { authState } from '@/state/authState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const useLogout = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);
  const clearEventData = useClearEventData();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`logout error: ${error.message}`);
    } else {
      clearEventData();
      setAuth(false);
      navigate('/login');
    }
  };

  return handleLogout;
};
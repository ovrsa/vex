import { supabase } from '@/lib/utils';
import { authState } from '@/state/authState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const useLogout = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`logout error: ${error.message}`);
    } else {
      setAuth(false);
      navigate('/login');
    }
  };

  return handleLogout;
};
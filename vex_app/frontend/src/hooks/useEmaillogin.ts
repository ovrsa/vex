import { supabase } from '@/lib/utils';
import { authState } from '@/state/authState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';


export type LoginData = {
  email: string;
  password: string;
};

export const useEmailLogin = () => {
  /** Emailログイン処理 */
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();

  const handleEmailLogin = async (data: LoginData) => {
    const { data: loginData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(`Login Error`);
      console.error('Login Error:', error.message);
    } else {
      if (loginData.session) {
        setAuth(loginData.session);
        navigate('/');
      }
    }
  };

  return { handleEmailLogin };
};
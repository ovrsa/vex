import { supabase } from '@/lib/utils';
import { authState } from '@/state/authState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

export const Logout = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleLogout = async () => {
    // ログアウト処理
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`logout error: ${error.message}`);
    } else {
      setAuth(false); // 認証状態を更新
      navigate('/login'); // ログインページにリダイレクト
    }
  };
  
  return (
    <button onClick={handleLogout}>Logout</button>
  );
};
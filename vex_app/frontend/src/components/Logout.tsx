import { supabase } from '@/lib/utils';
import { authState } from '@/state/authState';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

const Logout = () => {
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(`logout error: ${error.message}`);
    } else {
      alert("logout successful");
      setAuth(false); // 認証状態を更新
      navigate('/login'); // ログインページにリダイレクト
    }
  };
  
  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
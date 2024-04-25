import { supabase } from '@/lib/utils';

export const useGoogleLogin = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  
    if (error) {
      console.error('Login error:', error.message);
      alert('Login failed');
    } else {
      alert('Login successful');
      // TODO: ログイン成功後の処理
    }
  };

  return { handleGoogleLogin };
};
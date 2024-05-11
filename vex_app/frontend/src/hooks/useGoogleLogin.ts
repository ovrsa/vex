import { supabase } from '@/lib/utils';
import { authState } from '@/state/authState';
import { useSetRecoilState } from 'recoil';

export const useGoogleLogin = () => {
    const setAuth = useSetRecoilState(authState);

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });

        if (error) {
            console.error('Login error:', error.message);
            alert(`Login Error: ${error.message}`);
            return;
        }

        // リダイレクト後にセッションを確認
        const currentSession = supabase.auth.getSession();
        if (currentSession) {
            alert('Login successful!');
            setAuth(currentSession);
        }
    };

    return { handleGoogleLogin };
};
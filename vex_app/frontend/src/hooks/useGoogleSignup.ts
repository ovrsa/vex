import { supabase } from "@/lib/utils";


export const useGoogleSignup = () => {
    // Googleログイン処理
    const handleGoogleSignup = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
        });
        if (error) {
            console.error('Signup Error:', error);
            alert(`Signup Error: ${error.message}`);
        } else {
            alert('Signup successful');
            // TODO: ログイン成功後の処理
        }
    };
    return { handleGoogleSignup };
}


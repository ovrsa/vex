import { supabase } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export type SignupData = {
    email: string;
    password: string;
  };
  
export const useEmailSignup = () => {
    // Emailサインアップ処理
    const navigate = useNavigate();

    const handleEmailSignup = async (data: SignupData) => {
        const { error } = await supabase.auth.signUp({
            email: data.email,
            password: data.password,
        });
    
        if (error) {
            alert(`Signup Error`);
            console.error('Signup Error:', error);
            return;
        } else {
            alert('登録ありがとうございます。確認メールを送信しましたので、メール内のリンクをクリックしてアカウントを有効化してください。その後、ログイン画面からログインしてください。');
            navigate('/login');
        }
    };
    
    return { handleEmailSignup };
}


import { supabase } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type SignupData = {
  email: string;
  password: string;
};


const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>();
  const navigate = useNavigate();

  // Google認証のハンドラ
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Signup Error:', error);
      alert(`Signup Error: ${error.message}`);
      return;
    }
  };

  // メール認証のハンドラ
  const onSubmit = async (data: SignupData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
  
    if (error) {
      console.error('Signup Error:', error);
      alert(`Signup Error: ${error.message}`);
      return;
    } else {
      alert('登録ありがとうございます。確認メールを送信しましたので、メール内のリンクをクリックしてアカウントを有効化してください。その後、ログイン画面からログインしてください。');
      console.log('Signup successful:', error);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full" style={{ background: 'linear-gradient(to bottom right, #F5F6FF, #F5F6FF)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100">
        <h2 className="text-2xl mb-8 text-center">Create Acount</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <button 
              type="button" 
              onClick={handleGoogleSignup} 
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
              Sign up with Google
            </button>
            <div className="text-center text-sm text-gray-500">or</div>
          </div>

          {/* email */}
          <div>
            <input
              id="email"
              type="email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 placeholder-gray-400"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
          </div>

          {/* password */}
          <div>
            <input
              id="password"
              type="password"
              {...register('password', { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 placeholder-gray-400"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">Password is required.</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Create Account</button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-700">Already have an account?</span>
          <a href="/login" className="text-blue-600 text-sm hover:underline">Login now</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;


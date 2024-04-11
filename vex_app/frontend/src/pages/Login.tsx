import { supabase } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginData = {
  email: string;
  password: string;
};


const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  // useNavigate: 特定のイベントハンドラ内から、特定のパスに対してユーザーをリダイレクトさせることが出来る
  const navigate = useNavigate(); 
  
  // Google認証のハンドラ
  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      alert(`Signup Error: ${error.message}`);
    } else {
      // error以外はログイン成功
      alert('Signup successful');
      navigate('/');
    }
  };

  // メール認証のハンドラ
  const onSubmit = async (data: LoginData) => {
    // 処理の中でErrorが発生した場合はerror
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(`Login Error: ${error.message}`);
    } else {
      // Error以外はログイン成功とみなす
      alert('Login Success');
      navigate('/');
    }
  };

  
  return (
    <div className="h-full min-h-screen flex justify-center items-center w-full" style={{ background: 'linear-gradient(to bottom right, #F5F6FF, #F5F6FF)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100">
        <h2 className="text-2xl mb-8 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <button 
              type="button" 
              onClick={handleGoogleSignup} 
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
              Sign in with Google
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
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Log In</button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-700">Didn't have an account?</span>
          <a href="/signup" className="text-blue-600 text-sm hover:underline">Sign up now</a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
// react hooks
import { LoginData, useEmailLogin } from '@/hooks/useEmaillogin';
import { useGoogleLogin } from '@/hooks/useGoogleLogin';
import { FieldValues, useForm } from 'react-hook-form';

// assets
import googleIcon from '@/assets/google-icon.png';

export const LoginForm = () => {
    /**
     * ログインフォーム
     */
    const {register, handleSubmit, formState:{errors}} = useForm();
    const {handleGoogleLogin} = useGoogleLogin();
    const {handleEmailLogin} = useEmailLogin();

    const onSubmit = (data: FieldValues) => {
        handleEmailLogin(data as LoginData);
    }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl mb-8 text-center">Login</h2 >

        {/* Google */}
        <div className="space-y-4">
            <button
                type="button"
                onClick={handleGoogleLogin} 
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
            <img src={googleIcon} alt="Google" className="h-4 w-4 mr-3" />
                Sign in with Google
            </button>
            <div className="text-center text-sm text-gray-500">or</div>
        </div>

        {/* email */}
        <div>
            <input
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

        {/* Submit */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">Log In</button>

        <div className="mt-6 text-center">
            <span className="text-sm text-gray-700">Didn't have an account?</span>
            <a href="/signup" className="text-blue-600 text-sm hover:underline">Sign up now</a>
        </div>
    </form>
  );
};


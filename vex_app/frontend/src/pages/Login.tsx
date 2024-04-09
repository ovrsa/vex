import { useForm } from 'react-hook-form';

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Implement the signup logic here
  };

  return (
    // Inline style for full-screen gradient background
    // TODO: フルスクリーン化する
    <div className="h-full min-h-screen flex justify-center items-center w-full" style={{ background: 'linear-gradient(to bottom right, #F5F6FF, #F5F6FF)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100">
        <h2 className="text-2xl mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <button type="button" className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <img src="/path-to-your-google-icon.svg" alt="Google" className="h-5 w-5 mr-3" />
              Sign in with Google
            </button>
            <div className="text-center text-sm text-gray-500">or</div>
          </div>
          <div>
            <input
              id="email"
              name="email"
              type="email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white bg-opacity-50 placeholder-gray-400"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">Email is required.</p>}
          </div>
          <div>
            <input
              id="password"
              name="password"
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
          {' '}
          <a href="#" className="text-blue-600 text-sm hover:underline">Sign up now</a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
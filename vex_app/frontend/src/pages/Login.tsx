import { LoginForm } from '@/components/LoginForm';


const LogIn = () => {
  /**
   * ユーザーがログインするためのフォーム
   */
  
  return (
    <div className="h-full min-h-screen flex justify-center items-center w-full" style={{ background: 'linear-gradient(to bottom right, #F5F6FF, #F5F6FF)' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full backdrop-filter backdrop-blur-lg bg-opacity-30 border border-gray-100">
        <LoginForm />
      </div>
    </div>
  );
};

export default LogIn;
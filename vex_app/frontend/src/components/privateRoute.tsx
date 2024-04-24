import { authState } from '@/state/authState';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const auth = useRecoilValue(authState);

  // authがnullならログインページにリダイレクト
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


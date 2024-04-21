import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import PrivateRoute from './components/privateRoute';
import Home from './pages/Home';
import LogIn from './pages/Login';
import Signup from './pages/Signup';
import { authState } from './state/authState';

const AppInitializer = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setAuth(JSON.parse(session));
      console.log('localStorage session:', session);
    }
  }, [setAuth]);

  return null; // このコンポーネントはUIをレンダリングしない
};

function App() {
  return (
    <RecoilRoot>
      <AppInitializer /> {/* RecoilRoot内でAppInitializerを使用 */}
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
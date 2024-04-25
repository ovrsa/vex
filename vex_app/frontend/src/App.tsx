// react hooks
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// components
import { PrivateRoute } from './components/PrivateRoute';
import { AppInitializer } from './setup/AppInitializer';

// pages
import Home from './pages/Home';
import { LogIn } from './pages/Login';
import { Signup } from './pages/Signup';


export const App = () => {
  return (
    <RecoilRoot>
      <AppInitializer />
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


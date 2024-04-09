import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import LogIn from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<LogIn />} />
      </Routes>
    </Router>

  )
}

export default App

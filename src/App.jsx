import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Auth from './Auth';

function App() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Auth>
            <Home />
          </Auth>
        }
      />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
}

export default App;

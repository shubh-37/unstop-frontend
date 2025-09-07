import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    const onStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/home" replace /> : <Navigate to="/auth/login" replace />} />
      <Route
        path="/home"
        element={
          token ? (
            <Home
              onLogout={() => {
                localStorage.removeItem('token');
                setToken(null);
              }}
            />
          ) : (
            <Navigate to="/auth/login" replace />
          )
        }
      />
      <Route
        path="/auth/login"
        element={
          token ? (
            <Navigate to="/home" replace />
          ) : (
            <Login
              onLogin={(t) => {
                localStorage.setItem('token', t);
                setToken(t);
              }}
            />
          )
        }
      />
      <Route path="*" element={token ? <Navigate to="/home" replace /> : <Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;

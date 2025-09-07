import { Navigate } from 'react-router-dom';

export default function Auth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/auth/login" />;
}

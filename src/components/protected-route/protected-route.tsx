import { Navigate } from 'react-router-dom';
import { getCookie } from '@utils/cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getCookie('accessToken');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};

import { Navigate, Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  const isAuth = false;

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

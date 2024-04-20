import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const AuthLayout = () => {
  const { user } = useContext(AuthContext);

  return user.isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <section className="container">
      <Outlet />
    </section>
  );
};

import { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { checkAuthenticated, isAuthenticated, isFetching } =
    useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (isFetching) return;

    console.log('isAuthenticated', isAuthenticated);

    checkAuthenticated()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate('/login');
        setIsLoading(false);
      });
  }, [navigate]);

  return isLoading ? (
    <div>Loading...</div>
  ) : isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

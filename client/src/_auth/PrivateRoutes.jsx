import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const { isAuthenticated, fetching } = useContext(AuthContext);

  return !fetching ? (
    isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    )
  ) : (
    <div>Loading...</div>
  );
};

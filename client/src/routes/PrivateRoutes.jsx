/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoutes = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div>Loading...</div>
  ) : user.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

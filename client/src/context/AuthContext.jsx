/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(true);

  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    await axios
      .get('/api/auth/user-authentication', { withCredentials: true })
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        setUser(res.data);
        setIsAuthenticated(true);
        setFetching(false);
        return true;
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setFetching(false);
      });
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const login = (data) => {
    axios
      .post('/api/auth/login', data)
      .then((res) => {
        if (res.status === 200 && res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
          navigate('/');
          setFetching(false);
        }
      })
      .catch((err) => {
        setError(err.response.data);
        setFetching(false);
      });
  };

  const logout = () => {
    axios
      .get('/api/auth/logout')
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        if (res.status === 200) {
          setUser(null);
          setIsAuthenticated(false);
          window.location.reload();
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        error,
        fetching,
        checkAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

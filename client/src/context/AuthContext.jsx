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

  useEffect(() => {
    axios
      .get('/api/auth/user-authentication')
      .then((res) => {
        if (res.status !== 200) {
          return;
        }
        setUser(res.data);
        setIsAuthenticated(true);
        setFetching(false);
        console.log('authenticated');
      })
      .catch((err) => {
        console.log(err);
        setFetching(false);
      });
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
        console.log(err.response.data);
        setError(err.response.data);
        setFetching(false);
      });
  };

  const logout = () => {
    axios
      .get('/api/auth/logout')
      .then((res) => {
        setUser(null);
        setIsAuthenticated(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

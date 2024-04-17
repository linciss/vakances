/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/auth/user')
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
        console.log('authenticated');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const login = (data) => {
    axios
      .post('/api/auth/login', data)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setIsAuthenticated(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
      });
  };

  const logout = () => {
    axios
      .get('/api/auth/logout')
      .then((res) => {
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

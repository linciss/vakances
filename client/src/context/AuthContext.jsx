/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ isLoggedIn: null });

  const autoLogIn = async () => {
    await axios
      .get('/api/auth/auto-login', {
        withCredentials: true,
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setUser({ isLoggedIn: false });
        return;
      })
      .then((res) => {
        if (!res || res.statusText !== 'OK' || res.status >= 400) {
          setUser({ isLoggedIn: false });
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          setUser({ isLoggedIn: false });
          return;
        } else if (!data.authenticated) {
          setUser({ isLoggedIn: false });
        }
        setUser(data);
      });
  };

  useEffect(() => {
    autoLogIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

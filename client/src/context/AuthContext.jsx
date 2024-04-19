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
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const checkAuthenticated = async () => {
    try {
      const res = await axios.get('/api/auth/user-authentication', {
        withCredentials: true,
      });
      setUser(res.data);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
        setSuccess(null);
      }
    }
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
          setError(null);
        }
      })
      .catch((err) => {
        setError(err.response.data);
        setFetching(false);
        setSuccess(null);
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
          setFetching(false);
          window.location.reload();
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        setSuccess(null);
      });
  };

  const changePassword = (data) => {
    axios
      .put('/api/auth/change-password', data)
      .then((res) => {
        if (res.status === 200) {
          setError(null);
          setSuccess('Parole samainīta veiksmīgi!');
          setTimeout(() => {
            navigate('/');
            setSuccess(null);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const responseData = err.response.data;
          if (responseData.error === 'incorrect_password') {
            setError('Nepareiza parole!');
          } else if (responseData.error === 'passwords_do_not_match') {
            setError('Paroles nesakrīt!');
          } else if (responseData.error === 'passwords_are_the_same') {
            setError('Jaunā parole nedrīkst būt tāda pati kā iepriekšējā!');
          } else {
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
          }
        } else {
          setError(err.response.data);
          navigate('/');
        }
        setSuccess(null);
      });
  };

  const changeUsername = (data) => {
    axios
      .put('/api/auth/change-username', data)
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
          setSuccess('Lietotājvārds samainīts veiksmīgi!');
          setError(null);
          setTimeout(() => {
            navigate('/');
            setSuccess(null);
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          const responseData = err.response.data;
          if (responseData.error === 'username_is_the_same') {
            setError(
              'Jaunais lietotājvārds nedrīkst būt tāds pats kā iepriekšējais!'
            );
          } else if (responseData.error === 'fill_all_fields') {
            setError('Lūdzu aizpildiet visus laukus!');
          } else if (responseData.error === 'incorrect_password') {
            setError('Nepareiza parole!');
          } else if (responseData.error === 'user_exists') {
            setError('Lietotājs ar šādu lietotājvārdu jau eksistē!');
          } else {
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login');
          }
        } else {
          setError(err.response.data);
          navigate('/');
        }
        setSuccess(null);
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
        changePassword,
        changeUsername,
        success,
        checkAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

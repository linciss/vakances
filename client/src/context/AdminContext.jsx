/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    axios
      .get('/api/vacancies/count')
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {
        if (!res || !res.status === 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setApplicationCount(data);
      });
  }, []);

  return (
    <AdminContext.Provider value={applicationCount}>
      {children}
    </AdminContext.Provider>
  );
};

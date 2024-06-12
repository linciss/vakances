import React, { createContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';

export const VacancyContext = createContext();

// eslint-disable-next-line react/prop-types
export const VacancyProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([]);
  const getVacancies = async () => {
    await axios
      .get('/vacancies/all')
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setVacancies(data);
      });
  };

  useEffect(() => {
    getVacancies();
  }, []);

  return (
    <VacancyContext.Provider value={vacancies}>
      {children}
    </VacancyContext.Provider>
  );
};

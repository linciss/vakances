/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get('/news')
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ArticlesContext.Provider value={articles}>
      {children}
    </ArticlesContext.Provider>
  );
};

/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/news/all')
      .then((response) => {
        setArticles(response.data);
        setError(null);
      })
      .catch((error) => {
        console.log(error);
        setError('Neizdevās ielādēt ziņas.');
      });
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, error }}>
      {children}
    </ArticlesContext.Provider>
  );
};
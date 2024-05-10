import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Vacancies = () => {
  const [vacancies, setVacancies] = useState([]);

  const getVacancies = async () => {
    axios
      .get('/api/vacancies/all')
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || !res.status === 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        setVacancies(data);
      });
  };

  useEffect(() => {
    getVacancies();
  }, []);

  return (
    <div className="container max-w-[1280px]">
      {vacancies &&
        vacancies.map((vacancy) => {
          return (
            <Link
              to={`/vacancies/${vacancy._id}`}
              key={vacancy.id}
              className="btn btn-primary"
            >
              {vacancy.title}
            </Link>
          );
        })}
    </div>
  );
};

export default Vacancies;

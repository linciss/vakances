import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { VacancyContext } from '../../context/VacancyContext';

const Vacancies = () => {
  const vacancies = useContext(VacancyContext);

  return (
    <div className="container max-w-[1280px]">
      {vacancies &&
        vacancies.map((vacancy) => {
          return (
            <Link
              to={`/vacancies/${vacancy._id}`}
              key={vacancy._id}
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

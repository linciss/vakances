import React, { useEffect, useState } from 'react';

import axios from 'axios';

const VacancyView = () => {
  const [vacancies, setVacancies] = useState(null);

  const getVacancies = async () => {
    await axios
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
    <div className="overflow-x-auto">
      <table className="table">
        {vacancies ? (
          <>
            <thead>
              <tr>
                <th></th>
                <th>Vakances nosaukums</th>
                <th>Atrašanās vieta</th>
                <th>Izveidošanas datums</th>
                <th>Pēdējā rediģēšana</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((vacancy, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{vacancy.title}</td>
                  <td>{vacancy.address}</td>
                  <td>{vacancy.timeCreated.slice(0, 10)}</td>
                  <td>
                    {vacancy.timeEdited.slice(0, 10)}{' '}
                    {vacancy.timeEdited.slice(11, 19)}
                  </td>
                  <td>Rediģēt</td>
                  <td>Dzēst</td>
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </table>
    </div>
  );
};

export default VacancyView;

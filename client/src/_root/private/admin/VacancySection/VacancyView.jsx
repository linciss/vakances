import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Dots } from '../../../../assets/Dots';

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

  const deleteVacancy = async (id) => {
    axios
      .delete(`/api/vacancies/${id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || !res.status === 200) {
          return;
        }
        getVacancies();
      });
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Vakances</h1>
      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8">
        {vacancies ? (
          <table className="table mt-8">
            <thead>
              <tr>
                <th></th>
                <th>Vakances nosaukums</th>
                <th>Atrašanās vieta</th>
                <th>Izveidošanas datums</th>
                <th>Pēdējā rediģēšana</th>
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
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="">
                        <Dots />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow  bg-white rounded-box w-[150px]  "
                      >
                        <li className="w-full text-center">
                          <p className="text-xl text-center">Dzēst</p>
                        </li>
                        <li className="w-full">
                          <p className="text-xl text-center">Rediģēt</p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
    </div>
  );
};

export default VacancyView;

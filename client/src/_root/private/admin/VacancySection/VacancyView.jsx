import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { Dots } from '../../../../assets/Dots';
import { EditIcon } from '../../../../assets/EditIcon';

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
    <div className="overflow-x-auto">
      {vacancies ? (
        <table className="table">
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
                      className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-[85px]"
                    >
                      <li className="w-[70px]">
                        <div>
                          <DeleteIcon />
                        </div>
                      </li>
                      <li className="w-[70px]">
                        <EditIcon />
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
  );
};

export default VacancyView;

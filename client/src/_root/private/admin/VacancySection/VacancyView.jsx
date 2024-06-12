import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { Dots } from '../../../../assets/Dots';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { EditIcon } from '../../../../assets/EditIcon';

import { AuthContext } from '../../../../context/AuthContext';
import { Spinner } from '../../../../components/common/Spinner';

const VacancyView = () => {
  const [vacancies, setVacancies] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const getVacancies = async () => {
    await axios
      .get('http://localhost:5000/api/vacancies/admin')
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
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
      .delete(`http://localhost:5000/api/vacancies/${id}`)
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
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
                          <Link
                            to={`/admin/vacancies/${vacancy._id}`}
                            className="text-xl text-center"
                          >
                            <EditIcon />
                            Rediģēt
                          </Link>
                        </li>
                        <li
                          className="w-full text-center"
                          onClick={() => deleteVacancy(vacancy._id)}
                        >
                          <p className="text-xl text-center">
                            <DeleteIcon />
                            Dzēst
                          </p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default VacancyView;

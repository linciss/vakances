/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Dots } from '../../../../assets/Dots';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { CheckIcon } from '../../../../assets/CheckIcon';
import { AuthContext } from '../../../../context/AuthContext';

const Applications = () => {
  const [applications, setApplications] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteApplication = async (id) => {
    await axios.delete(`/api/applications/${id}`).catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        setUser({ isLoggedIn: false });
        navigate('/');
      }
    });
    getApplications();
  };

  const getApplications = async () => {
    await axios
      .get('/api/applications/get')
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (res.status !== 200 || !res) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setApplications(data);
      });
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Pieteikumi</h1>
      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8">
        {applications ? (
          <table className="table mt-8">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Pilnais vārds</th>
                <th>Vakance</th>
                <th>Pierakstīšanās datums</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 2 */}
              {applications.map((application, index) => {
                const date = new Date(application.timeCreated).toLocaleString(
                  'en-LV',
                  { hour12: false }
                );
                return (
                  <tr key={index} className="hover">
                    <th>{index + 1}</th>
                    <td>
                      {application.name} {application.surname}
                    </td>
                    <td>{application.vacancyName}</td>
                    <td>
                      {date.slice(0, 10)} {date.slice(11, 20)}
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
                              to={`/admin/applications/${application._id}`}
                              className="text-xl text-center"
                            >
                              <CheckIcon />
                              Apskatīt
                            </Link>
                          </li>
                          <li
                            className="w-full"
                            onClick={() => deleteApplication(application._id)}
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
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
    </div>
  );
};

export default Applications;

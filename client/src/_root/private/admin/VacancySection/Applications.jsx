/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Dots } from '../../../../assets/Dots';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { CheckIcon } from '../../../../assets/CheckIcon';
import { AuthContext } from '../../../../context/AuthContext';
import { Spinner } from '../../../../components/common/Spinner';
import { useForm } from 'react-hook-form';

const Applications = () => {
  const [applications, setApplications] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(3);

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

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return 'Iesniegts';
      case 1:
        return 'Apstiprināts';
      case 2:
        return 'Noraidīts';
      default:
        return 'Iesniegts';
    }
  };

  const handleStatus = (e) => {
    setSelectedStatus(Number(e.target.value));
    console.log(e.target.value);
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold">Pieteikumi</h1>
      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8">
        <div className="mt-8">
          <form>
            <select
              value={selectedStatus}
              className="select select-bordered w-full max-w-xs bg-white"
              onChange={(e) => handleStatus(e)}
            >
              <option disabled selected>
                Status
              </option>
              <option value={0}>Iesniegts</option>
              <option value={1}>Apstiprināts</option>
              <option value={2}>Noraidīts</option>
              <option value={3}>Visi</option>
            </select>
          </form>
        </div>
        {applications ? (
          <table className="table mt-4">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Pilnais vārds</th>
                <th>Vakance</th>
                <th>Pierakstīšanās datums</th>
                <th>Statuss</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 2 */}
              {applications
                .filter(
                  (application) =>
                    (selectedStatus === 3 && application.status !== 2) ||
                    application.status === selectedStatus
                )
                .map((application, index) => {
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
                      <td>{getStatus(application.status)}</td>
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
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Applications;

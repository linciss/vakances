/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dots } from '../../../../assets/Dots';

const Applications = () => {
  const [applications, setApplications] = useState([
    { title: 'Front-end Developer', salary: '2000', date: '2021-10-10' },
  ]);

  // useEffect(() => {
  //   axios
  //     .get('/api/vacancies/get')
  //     .catch((err) => {
  //       console.error(err);
  //     })
  //     .then((res) => {
  //       if (!res || !res.status === 200) {
  //         return;
  //       }
  //       return res.data;
  //     })
  //     .then((data) => {
  //       if (!data) {
  //         return;
  //       }
  //       setApplications(data);
  //     });
  // }, []);

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
              {applications.map((application, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{application.title}</td>
                  <td>{application.salary}</td>
                  <td>{application.date}</td>
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

export default Applications;

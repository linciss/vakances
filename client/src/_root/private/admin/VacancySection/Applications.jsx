/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="overflow-x-auto">
      {applications ? (
        <table className="table">
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
            {/* {applications.map((application, index) => (
            <tr key={index} className="hover">
              <th>{index + 1}</th>
              <td>{application.title}</td>
              <td>{application.salary}</td>
              <td>{application.date}</td>
              <td>Apskatīt</td>
            </tr>
          ))} */}
            <tr>
              <th>1</th>
              <td>John Doe</td>
              <td>Front-end Developer</td>
              <td>2021-10-10</td>
              <td>Apskatīt</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <span className="loading loading-spinner loading-lg"></span>
      )}
    </div>
  );
};

export default Applications;

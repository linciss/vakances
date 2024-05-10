import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get('/api/vacancies/get')
      .catch((err) => {
        console.error(err);
      })
      .then((res) => {
        if (!res || !res.status === 200) {
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
  }, []);

  return (
    <div className="overflow-x-auto">
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
          {applications.map((application, index) => (
            <tr key={index} className="hover">
              <th>{index + 1}</th>
              <td>{application.title}</td>
              <td>{application.salary}</td>
              <td>{application.date}</td>
              <td>Apskatīt</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

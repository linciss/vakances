import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [vacancyCount, setVacancyCount] = useState(null);
  const [applicationCount, setApplicationCount] = useState(null);
  const [userCount, setUserCount] = useState(null);

  const getVacancyCount = async () => {
    axios
      .get('/api/vacancies/count', { withCredentials: true })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setVacancyCount(data);
      });
  };

  const getApplicationCount = async () => {
    await axios
      .get('/api/applications/count', { withCredentials: true })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (data === undefined) {
          return;
        }
        setApplicationCount(data);
      });
  };

  const getUserCount = async () => {
    await axios
      .get('/api/users/count', { withCredentials: true })
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setUserCount(data);
      });
  };

  useEffect(() => {
    getVacancyCount();
    getApplicationCount();
    getUserCount();
  }, []);

  const currDate = new Date().toDateString();

  return (
    <>
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow mt-8">
        {/* STATS */}
        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">Vakances</div>
          {vacancyCount !== null && vacancyCount !== undefined ? (
            <div className="stat-value">{vacancyCount}</div>
          ) : (
            <div className="stat-value">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          )}
          <div className="stat-desc text-lg"></div>
          {currDate.slice(4, 10)} {currDate.slice(11, 15)}
        </div>

        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">
            Cilvēki pieteikušies vakancēm
          </div>
          {applicationCount !== null && applicationCount !== undefined ? (
            <div className="stat-value">{applicationCount}</div>
          ) : (
            <div className="stat-value">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          )}
          <div className="stat-desc text-lg">
            {currDate.slice(4, 10)} {currDate.slice(11, 15)}
          </div>
        </div>

        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">Darbinieki</div>
          {userCount !== null && userCount !== undefined ? (
            <div className="stat-value">{userCount}</div>
          ) : (
            <div className="stat-value">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          )}

          <div className="stat-desc text-lg">
            {currDate.slice(4, 10)} {currDate.slice(11, 15)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

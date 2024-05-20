import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [count, setCount] = useState(null);
  const getCount = async () => {
    axios
      .get('/api/vacancies/count', { withCredentials: true })
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
        if (!data) return;
        setCount(data);
      });
  };

  useEffect(() => {
    getCount();
  }, []);

  return (
    <>
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        {/* STATS */}
        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">Vakances</div>
          {count ? (
            <div className="stat-value">{count}</div>
          ) : (
            <div className="stat-value">
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          )}
          <div className="stat-desc text-lg">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">
            Cilvēki pieteikušies vakancēm
          </div>
          <div className="stat-value">4,200</div>
          <div className="stat-desc text-lg">↗︎ 400 (22%)</div>
        </div>

        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">Darbinieki</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc text-lg">↘︎ 90 (14%)</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

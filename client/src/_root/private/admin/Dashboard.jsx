import React, { useContext } from 'react';
import { AdminContext } from '../../../context/AdminContext';

const Dashboard = () => {
  const applicationCount = useContext(AdminContext);

  return (
    <>
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <div className="stats stats-vertical lg:stats-horizontal shadow">
        {/* STATS */}
        <div className="stat bg-base-300 py-8 gap-2">
          <div className="stat-title text-xl">Vakances</div>
          <div className="stat-value">{applicationCount}</div>
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

import React from 'react';

export const AdminPanel = () => {
  return (
    <div className="drawer md:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col gap-8 w-full container mt-10">
        <h1 className="text-6xl font-bold"></h1>
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat bg-base-300 py-8">
            <div className="stat-title text-lg">Vakances</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc text-lg">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat bg-base-300 py-8">
            <div className="stat-title text-lg">New Users</div>
            <div className="stat-value">4,200</div>
            <div className="stat-desc text-lg">↗︎ 400 (22%)</div>
          </div>

          <div className="stat bg-base-300 py-8">
            <div className="stat-title text-lg">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc text-lg">↘︎ 90 (14%)</div>
          </div>
        </div>

        {/* <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button md:hidden"
        >
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side md:top-0 top-12">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full  bg-neutral text-white">
          {/* Sidebar content here */}
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

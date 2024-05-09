import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const AdminPanel = () => {
  return (
    <div className="drawer md:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col gap-8 w-full container mt-10">
        <Outlet />

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
        <ul className="menu p-4 w-80 min-h-full bg-neutral text-white gap-6">
          {/* Sidebar content here */}
          <li>
            <Link to="/admin/dashboard" className="text-2xl btn btn-neutral">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/vacancies" className="text-2xl  btn btn-neutral">
              Vakances
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

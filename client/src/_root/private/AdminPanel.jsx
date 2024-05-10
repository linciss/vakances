import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AdminProvider } from '../../context/AdminContext';

const links = [
  {
    path: '/admin/dashboard',
    text: 'Dashboard',
  },
  {
    path: '/admin/applications',
    text: 'Vakanču pieteikumi',
  },
  {
    path: 'admin/new-vacancy',
    text: 'Vakanču veidošana',
  },
];

export const AdminPanel = () => {
  return (
    <div className="drawer md:drawer-open ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col gap-8 w-full container mt-10">
        <AdminProvider>
          <Outlet />
        </AdminProvider>
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
          {links.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className="text-xl btn btn-neutral">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

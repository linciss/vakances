import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AdminProvider } from '../../context/AdminContext';

const vacancyLinks = [
  {
    path: '/admin/applications',
    text: 'Vakanču pieteikumi',
  },
  {
    path: 'admin/new-vacancy',
    text: 'Vakanču veidošana',
  },
];
const AdminPanel = () => {
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
          <li>
            <Link to={'/admin/dashboard'} className="text-xl btn btn-neutral">
              Dashboard
            </Link>
          </li>
          <div className="collapse collapse-arrow bg-neutral">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Vakanču sadaļa
            </div>
            <div className="collapse-content">
              {vacancyLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-xl btn btn-neutral">
                    {link.text}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={'/admin/vacancies'}
                  className="text-xl btn btn-neutral"
                >
                  Vakances
                </Link>
              </li>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;

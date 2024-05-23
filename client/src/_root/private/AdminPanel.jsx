import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const tables = [
  {
    path: '/admin/applications',
    text: 'Pieteikumu tabula',
  },
  {
    path: 'admin/vacancies',
    text: 'Vakances tabula',
  },
  {
    path: '/admin/news',
    text: 'Jaunumu tabula',
  },
  {
    path: '/admin/users',
    text: 'Lietotāju tabula',
  },
];

const forms = [
  {
    path: 'admin/new-vacancy',
    text: 'Vakanču formas',
  },
  {
    path: '/admin/new-news',
    text: 'Jaunumu formas',
  },
];

const AdminPanel = () => {
  return (
    <div className="drawer md:drawer-open shadow-xl">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col w-full container mt-10">
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

        <ul className="menu p-4 w-80 min-h-full bg-primary text-white gap-6 border-2">
          {/* Sidebar content here */}
          <li>
            <Link to={'/admin'} className="text-xl btn btn-primary shadow-none">
              Dashboard
            </Link>
          </li>

          <div className="collapse bg-mainBg text-black collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">Formas</div>
            <div className="collapse-content">
              {forms.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xl btn btn-primary shadow-none"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <div className="collapse  bg-primary collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium text-black">
              Tabulas
            </div>
            <div className="collapse-content">
              {tables.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-xl btn btn-primary shadow-none"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;

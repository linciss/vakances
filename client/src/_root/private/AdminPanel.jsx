import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const tables = [
  {
    path: '/admin/applications',
    text: 'Pieteikumi',
  },
  {
    path: 'admin/vacancies',
    text: 'Vakances',
  },
  {
    path: '/admin/news',
    text: 'Jaunumi',
  },
];

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="drawer md:drawer-open shadow-xl">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col w-full container mt-10">
        <Outlet />
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
              Admina panelis
            </Link>
          </li>
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
          {user.role === 'admin' || user.role === 'root' ? (
            <li>
              <Link
                to={'/admin/users'}
                className="text-xl btn btn-primary shadow-none"
              >
                Lietotāji
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;

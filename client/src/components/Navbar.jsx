import React, { useContext } from 'react';

import userIcon from '../assets/user-icon.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const links = [
  {
    path: '/',
    text: 'MĀJAS',
  },
  {
    path: '/vacancies',
    text: 'VAKANCES',
  },
  {
    path: '/contact',
    text: 'KONTAKTI',
  },
  {
    path: '/about',
    text: 'PAR MUMS',
  },
];

const authLinks = [
  {
    path: '/profile',
    text: 'PROFILS',
  },
  {
    path: '/submissions',
    text: 'PIETEIKUMI',
  },
];

export const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await axios
      .get('/api/auth/logout')
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.statusText === 'OK' || res.status >= 400) {
          return;
        }
      })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          ...Object.keys(prevUser).reduce(
            (acc, key) => ({ ...acc, [key]: null }),
            {}
          ),
          isLoggedIn: false,
        }));
        return;
      });
  };

  return (
    <div className=" bg-neutral sticky top-0 text-white px-10 ">
      <div className="navbar  max-w-[1440px] w-full m-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to="/" className="text-3xl font-bold">
            IT ir spēks
          </Link>
        </div>
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal ">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-white cursor-pointer tracking-widest text-center font-semibold"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {user.isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Avatar" src={userIcon} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52"
            >
              {authLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-white">
                    {link.text}
                  </Link>
                </li>
              ))}
              <li onClick={handleLogout}>
                <a className="text-white">LOGOUT</a>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="menu menu-horizontal">
            <li>
              <Link
                to="/login"
                className="text-white cursor-pointer tracking-widest text-center font-semibold"
              >
                LOGIN
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

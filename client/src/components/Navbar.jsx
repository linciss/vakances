import React, { useContext } from 'react';

import userIcon from '../assets/user-icon.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
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
    path: '/news',
    text: 'JAUNUMI',
  },
];

const authLinks = [
  {
    path: '/profile',
    text: 'PROFILS',
  },
  {
    path: '/admin',
    text: 'ADMINA PANELIS',
  },
];

export const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const path = pathname.split('/')[1];

  const handleLogout = async () => {
    await axios
      .get('/auth/logout', { withCredentials: true })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || res.status >= 400) {
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
        navigate('/');
        return;
      });
  };

  return (
    <div
      className={` sticky top-0 text-white px-10 z-20 bg-neutral shadow-xl `}
    >
      <div className="navbar max-w-[1440px] w-full m-auto ">
        <div className="navbar-start sm:w-3/6 w-full">
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
              {links.map((link) => (
                <Link
                  to={link.path}
                  className={`text-white cursor-pointer tracking-widest text-center font-semibold relative p-2
               
             `}
                  key={link.path}
                >
                  {link.text}
                </Link>
              ))}
              {user.isLoggedIn ? (
                <>
                  {authLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="text-white cursor-pointer tracking-widest text-center font-semibold relative p-2"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                  <li onClick={handleLogout}>
                    <a className="text-white">LOGOUT</a>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-white cursor-pointer tracking-widest text-center font-semibold btn btn-neutral"
                  >
                    LOGIN
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <Link to="/" className="text-4xl font-bold">
            IT ir spēks
          </Link>
        </div>
        <div className="navbar-end hidden md:flex w-full">
          <ul className="menu menu-horizontal gap-6">
            {links.map((link) => (
              <Link
                to={link.path}
                className={`text-white cursor-pointer tracking-widest text-center font-semibold relative 
               ${
                 path === link.path.slice(1)
                   ? 'after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-base-100 after:rounded-t-md  after:animate-fadeIn'
                   : ''
               }
             `}
                key={link.path}
              >
                {link.text}
              </Link>
            ))}
          </ul>
        </div>
        {user.isLoggedIn ? (
          <div className="md:dropdown dropdown-end hidden ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user icon" src={userIcon} />
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
          <ul className="menu menu-horizontal hidden md:flex ">
            <li>
              <Link
                to="/login"
                className="text-white cursor-pointer tracking-widest text-center font-semibold btn btn-neutral"
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

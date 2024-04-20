import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import burgerwhite from '../assets/burgerwhite.svg';
import { AuthContext } from '../context/AuthContext';
import userIcon from '../assets/user-icon.svg';
import axios from 'axios';

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

const navbarClassnames = [
  'text-white',
  'font-semibold',
  'text-sm',
  'relative',
  'after:bg-lime-700',
  'after:absolute',
  'after:h-1',
  'after:w-0',
  'after:bottom-0',
  'after:left-0',
  'hover:after:w-full',
  'after:transition-all',
  'after:duration-300',
  'cursor-pointer',
  'tracking-widest',
  'text-center',
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

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
    <header className="max-h-16 h-16 bg-mainGreen flex items-center px-10 shadow-lg sticky top-0">
      <div className="flex  justify-between max-w-[1440px] w-full m-auto ">
        <Link
          to="/"
          className="text-white text-3xl font-bold"
          onClick={handleOpen}
        >
          <h1 className="">IT ir spēks</h1>
        </Link>
        <nav className="items-center flex">
          <img
            src={burgerwhite}
            className="h-10 w-10 block md:hidden"
            onClick={handleOpen}
          />
          <ul
            className={`  md:flex  ${
              isOpen
                ? 'z-20 fixed bg-mainGreen h-screen top-14 -translate-y-2 right-0 w-full flex flex-col items-center justify-center text-3xl animate-fadeIn '
                : 'hidden space-x-5 ml-auto z-10'
            }`}
          >
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={navbarClassnames.join(' ')}
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              {user.isLoggedIn ? (
                <img
                  src={userIcon}
                  className="w-6 h-6 cursor-pointer"
                  onClick={handleProfileMenu}
                />
              ) : (
                <Link to="/login" className={navbarClassnames.join(' ')}>
                  LOGIN
                </Link>
              )}
              {profileMenu && (
                <div className="fixed top-7 bg-secondaryGreen text-center w-36 -translate-x-40 z-40 rounded-md animate-fadeIn transition-all ">
                  <div className="py-2 grid grid-cols-1">
                    <header>
                      <h1 className="text-white text-md font-semibold">
                        {user.username || ''}
                      </h1>
                      <p className="text-white text-sm font-semibold">
                        {user.role || ''}
                      </p>
                    </header>
                    <hr className="border-white my-2 " />
                    <ul className="">
                      {authLinks.map((link) => (
                        <Link
                          to={link.path}
                          className={navbarClassnames.join(' ')}
                          onClick={() => handleProfileMenu()}
                          key={link.path}
                        >
                          {link.text}
                        </Link>
                      ))}
                      <button
                        className={navbarClassnames.join(' ')}
                        onClick={() => {
                          handleLogout();
                          handleProfileMenu();
                        }}
                      >
                        LOGOUT
                      </button>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

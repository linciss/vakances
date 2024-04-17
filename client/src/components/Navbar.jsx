import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import burgerwhite from '../assets/burgerwhite.svg';
import { AuthContext } from '../context/AuthContext';
import { LogOutButton } from './common/LogOutButton';

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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="max-h-16 h-16 bg-mainGreen flex items-center px-10 shadow-lg ">
      <div className="flex  justify-between max-w-[1440px] w-full m-auto ">
        <Link to="/" className="text-white text-3xl font-bold">
          <h1 className="">IT ir spēks</h1>
        </Link>
        <nav className="items-center flex">
          <img
            src={burgerwhite}
            className="h-10 w-10 block md:hidden"
            onClick={handleOpen}
          />
          <ul
            className={`  md:flex ${
              isOpen
                ? 'z-20 fixed bg-mainGreen h-screen top-14 -translate-y-2 right-0 w-full flex flex-col items-center justify-center text-3xl animate-fadeIn '
                : 'hidden space-x-5 ml-auto z-10'
            }`}
          >
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className=" text-white font-semibold text-sm relative after:bg-lime-700 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  cursor-pointer tracking-widest text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            <li>
              {isAuthenticated ? (
                <LogOutButton logout={logout} />
              ) : (
                <Link
                  to="/login"
                  className="text-white font-semibold text-sm relative after:bg-lime-700 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  cursor-pointer tracking-widest text-center"
                >
                  LOGIN
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

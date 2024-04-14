import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  const links = [
    {
      path: '/',
      text: 'HOME',
    },
    {
      path: '/login',
      text: 'LOGIN',
    },
  ];

  return (
    <header className="max-h-16 h-16 bg-mainGreen flex items-center px-10 shadow-lg  ">
      <div className="flex  justify-between max-w-[1440px] w-full m-auto ">
        <Link to="/" className="text-white text-3xl font-bold">
          <h1 className="">IT ir spēks</h1>
        </Link>
        <nav className="items-center flex">
          <ul className="flex space-x-5 ml-auto ">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className=" text-white font-semibold text-sm relative after:bg-lime-700 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  cursor-pointer tracking-widest"
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

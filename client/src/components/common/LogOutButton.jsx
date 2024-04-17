/* eslint-disable react/prop-types */
import React from 'react';

export const LogOutButton = ({ logout }) => {
  return (
    <button
      className="text-white font-semibold text-sm relative after:bg-lime-700 after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300  cursor-pointer tracking-widest text-center"
      onClick={() => logout()}
    >
      LOGOUT
    </button>
  );
};

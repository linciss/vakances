import React from 'react';
import headerImage from '../assets/header.png';
import headerVector from '../assets/headervector.png';

export const Header = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${headerImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80 "></div>
      <div className="hero-content flex-col justify-start items-start">
        <div className="text-white flex">
          <div className="flex flex-col justify-center items-start gap-4">
            <h1 className="text-7xl md:text-8xl font-bold md:text-start text-center">
              IT ir spēks
            </h1>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-start gap-4">
              <p className="py-6 md:text-2xl text-xl text-center md:text-start">
                Mēs esam šeit, lai palīdzētu Jums izprast IT nozares
                aktualitātes un piedāvāt jaunākās IT vakances.
              </p>
              <button className="btn btn-primary">Atrast vakances</button>
            </div>
          </div>
          <div>
            <img src={headerVector} />
          </div>
        </div>
      </div>
    </div>
  );
};

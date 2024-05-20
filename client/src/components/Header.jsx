import React from 'react';
import headerImage from '../assets/header.png';
import headerimg from '../assets/headerimg.avif';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div
      className="hero min-h-screen absolute top-0 "
      style={{
        backgroundImage: `url(${headerImage})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80 "></div>
      <div className="hero-content container max-w-[1280px] flex-col w-full md:mt-0 mt-32 px-10">
        <div className="text-white">
          <div className="flex items-center justify-center lg:items-start gap-4 flex-col">
            <h1 className="text-5xl md:text-8xl font-bold md:text-start text-center ">
              IT ir spēks
            </h1>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center lg:items-start gap-4 ">
              <p className="text-2xl md:text-5xl font-bold md:text-start text-center">
                Atrast darbu IT jomā nav nekas sarežģīts. Mēs līdzam atrast
                sapņu darbus IT jomā jau kopš 2010. gada.
              </p>
              <Link to={'/vacancies'} className="btn btn-primary ">
                Atrast vakances
              </Link>
            </div>
          </div>
        </div>
        <div className="md:mt-10 mt-8 flex flex-col items-end justify-end w-1/2 text-end text-white">
          <div className="w-full md:w-2/3 flex flex-col justify-center items-center lg:items-start gap-4 ">
            <p className="md:text-5xl  text-2xl font-bold"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

const HeroHome = () => {
  return (
    <section className="relative min-h-screen flex justify-center items-center">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-[52px] md:text-[88px] font-extrabold leading-tighter tracking-tighter mb-4">
              IT ir{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral to-green-500 animate-text">
                spēks
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-2xl text-black mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Tavs ceļš uz jaunām karjeras iespējām!
              </p>
              <div
                className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <a href="#about">
                  <div className="btn btn-base-300 px-20 text-xl">
                    Vairāk par mums
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;

import React, { useRef, useState } from 'react';
import FeaturesBg from '../assets/features-bg.png';

const About = () => {
  const [tab, setTab] = useState(1);

  const tabs = useRef(null);

  return (
    <section id="about" className="relative">
      <div
        className="absolute inset-0 bg-base-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-neutral/20 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-5xl mb-4 font-bold">Atrodi savu sapņu darbu</h1>
            <p className="text-2xl text-black">
              Mēs palīdzam meklēt darbus jau kopš 2010. gada
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <p className="text-4xl mb-3 font-bold">Vairāk par mums</p>
              </div>
              {/* Tabs buttons */}
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? 'bg-white shadow-md border-gray-200 hover:shadow-lg'
                      : 'bg-base-300 border-transparent'
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Atrodi sev īsto vakanci
                    </div>
                    <div className="text-gray-600">
                      Mēs piedāvājam jaunākos darba sludinājumus no vairāk nekā
                      100 darba devējiem Latvijā un ārvalstīs.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.953 4.29a.5.5 0 00-.454-.292H6.14L6.984.62A.5.5 0 006.12.173l-6 7a.5.5 0 00.379.825h5.359l-.844 3.38a.5.5 0 00.864.445l6-7a.5.5 0 00.075-.534z" />
                    </svg>
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? 'bg-white shadow-md border-gray-200 hover:shadow-lg'
                      : 'bg-base-300 border-transparent'
                  }`}
                  href="#0"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Jaunākās aktualitātes IT jomā
                    </div>
                    <div className="text-gray-600">
                      Uzzini par jaunākajām tendencēm IT jomā un seko līdzi
                      tehnoloģiju attīstībai.
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <svg
                      className="w-3 h-3 fill-current"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.854.146a.5.5 0 00-.525-.116l-11 4a.5.5 0 00-.015.934l4.8 1.921 1.921 4.8A.5.5 0 007.5 12h.008a.5.5 0 00.462-.329l4-11a.5.5 0 00-.116-.525z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1"
              data-aos="zoom-y-out"
              ref={tabs}
            >
              <div className="relative flex flex-col text-center lg:text-right">
                {tab === 1 && (
                  <div>
                    <div className="relative inline-flex flex-col">
                      <img
                        className="md:max-w-none mx-auto rounded animate-fadeInImage"
                        src={FeaturesBg}
                        width="500"
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </div>
                )}

                {/* Item 2 */}
                {tab === 2 && (
                  <div>
                    <div className="relative inline-flex flex-col">
                      <img
                        className="md:max-w-none mx-auto rounded animate-fadeInImage"
                        src={FeaturesBg}
                        width="500"
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </div>
                )}

                {/* Item 3 */}
                {tab === 3 && (
                  <div>
                    <div className="relative inline-flex flex-col">
                      <img
                        className="md:max-w-none mx-auto rounded animate-fadeInImage"
                        src={FeaturesBg}
                        width="500"
                        height="462"
                        alt="Features bg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { VacancyContext } from './../../context/VacancyContext';

const Vacancies = () => {
  const vacancies = useContext(VacancyContext);

  return (
    <div className="container max-w-[1280px]">
      <div className="bg-base-100 py-12 sm:py-32 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Vakances
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Atrodi sev piemērotāko vakanci
          </p>
        </div>
        {!vacancies ? (
          <div className="w-full flex justify-center items-center mt-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
            <div className="mx-auto  grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:max-w-none  w-full">
              {vacancies.map((vacancy) => {
                const date = new Date(vacancy.timeCreated).toLocaleString();

                return (
                  <article
                    key={vacancy._id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={date} className="text-gray-500">
                        {date.slice(0, 9)}
                      </time>
                      {/* <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category.title}
                </a> */}
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link to={`/vacancies/${vacancy._id}`}>
                          <span className="absolute inset-0" />
                          {vacancy.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {vacancy.description}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={''}>
                            <span className="absolute inset-0" />
                            ssssxs
                          </a>
                        </p>
                        <p className="text-gray-600">GGGG</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vacancies;

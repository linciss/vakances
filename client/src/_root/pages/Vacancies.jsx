import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { VacancyContext } from './../../context/VacancyContext';

const Vacancies = () => {
  const vacancies = useContext(VacancyContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(vacancies.length / 6);

  const currentItems = vacancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <button
        key={i}
        className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="container max-w-[1280px] ">
      <div className=" py-12 ">
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
          <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-300 w-full mt-8">
            <div className="mx-auto  grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-16  pt-10  lg:max-w-none w-full">
              {currentItems.map((vacancy) => {
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
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBNvV2CKwvDfXy3BqH7c0Dx5Fp_MQ5-EXKBd_l5Wayfg&s"
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <a href={''}>
                            <span className="absolute inset-0" />
                            LVT
                          </a>
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <div className="join flex justify-center pb-10">
          {paginationButtons}
        </div>
      )}
    </div>
  );
};

export default Vacancies;

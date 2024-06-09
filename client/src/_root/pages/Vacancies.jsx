import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { VacancyContext } from './../../context/VacancyContext';
import { AutoComplete } from '../../components/AutoComplete';
import { FilterIcon } from '../../assets/FilterIcon';
import { BookmarkInitialIcon } from '../../assets/BookmarkInitialIcon';
import { BookmarkedIcon } from '../../assets/BookmarkedIcon';

const Vacancies = () => {
  const initialVacancies = useContext(VacancyContext);
  const [vacancies, setVacancies] = useState(initialVacancies);

  const [query, setQuery] = useState('');
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(vacancies.length / 6);
  const [bookmarked, setBookmarked] = useState(
    JSON.parse(localStorage.getItem('bookmarked')) || []
  );

  const currentItems = vacancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e) => {
    const input = e.target.value;
    setQuery(input);

    const filtered = initialVacancies.filter(
      (vacancy, index, self) =>
        vacancy.title.toLowerCase().includes(input.toLowerCase()) &&
        index ===
          self.findIndex(
            (v) => v.title.toLowerCase() === vacancy.title.toLowerCase()
          )
    );

    setFilteredVacancies(filtered);
    setShowSuggestions(true);

    if (input === '') {
      setVacancies(initialVacancies);
      filtered.length = 0;
    }
    if (filtered.length > 0) {
      setVacancies(
        initialVacancies.filter((vacancy) =>
          vacancy.title.toLowerCase().includes(input.toLowerCase())
        )
      );
    }
  };

  const handleClick = (e) => {
    setQuery(e.target.innerText);
    setFilteredVacancies([]);
    setShowSuggestions(false);
    setCurrentPage(1);
    setVacancies(
      vacancies.filter((vacancy) => vacancy.title === e.target.innerText)
    );
  };

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

  const handleBookmark = (id) => {
    console.log(bookmarked);
    if (bookmarked.includes(id)) {
      const newBookmarked = bookmarked.filter((item) => item !== id);
      setBookmarked(newBookmarked);
      localStorage.setItem('bookmarked', JSON.stringify(newBookmarked));
      return;
    }
    const newBookmarked = [...bookmarked, id];
    setBookmarked(newBookmarked);
    localStorage.setItem('bookmarked', JSON.stringify(newBookmarked));
  };

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
            <div className="flex flex-row mt-4 gap-4">
              <div className="gap-6 grow">
                <label className="input input-bordered flex items-center gap-2 bg-white ">
                  <input
                    type="text"
                    className="grow bg-white"
                    placeholder="Meklēt"
                    onChange={handleSearch}
                    value={query}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 100)
                    }
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                {showSuggestions && query && (
                  <AutoComplete
                    handleClick={handleClick}
                    filteredVacancies={filteredVacancies}
                  />
                )}
              </div>
              <div className=" dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn">
                  <FilterIcon />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a>Jaunākās vakances</a>
                  </li>
                  <li>
                    <a>Pēc vecuma: vecākās</a>
                  </li>
                  <li>
                    <a>A-Z</a>
                  </li>
                  <li>
                    <a>Z-A</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mx-auto  grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-16  pt-10  lg:max-w-none w-full">
              {currentItems.map((vacancy) => {
                const date = new Date(vacancy.timeCreated).toLocaleString();
                return (
                  <article
                    key={vacancy._id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs justify-between w-full">
                      <time dateTime={date} className="text-gray-500">
                        {date.slice(0, 9)}
                      </time>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleBookmark(vacancy._id)}
                      >
                        {bookmarked.includes(vacancy._id) ? (
                          <BookmarkedIcon />
                        ) : (
                          <BookmarkInitialIcon />
                        )}
                      </div>
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

import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { VacancyContext } from '../../context/VacancyContext';
import FilterBar from '../../components/FilterBar';
import { Spinner } from '../../components/common/Spinner';
import { VacancyCard } from '../../components/common/VacancyCard';

const Vacancies = () => {
  const initialVacancies = useContext(VacancyContext);
  const [vacancies, setVacancies] = useState([]);

  const itemsPerPage = 6;
  const [showBookmarked, setShowBookmarked] = useState(false);
  const totalPages = Math.ceil(vacancies.length / 6);
  const [bookmarked, setBookmarked] = useState(
    JSON.parse(localStorage.getItem('bookmarked')) || []
  );

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  useEffect(() => {
    setVacancies(
      initialVacancies.sort(
        (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
      )
    );
  }, [initialVacancies]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', currentPage);
    navigate({ search: params.toString() }, { replace: true });
  }, [currentPage, navigate]);

  const currentItems = vacancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleFilterChange = (filteredVacancies) => {
    setVacancies(filteredVacancies);
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

  const handleToggleBookmarked = () => {
    setShowBookmarked(!showBookmarked);
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
          <Spinner />
        ) : (
          <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-300 w-full mt-8">
            <FilterBar
              currentItems={currentItems}
              initialVacancies={initialVacancies}
              onFilterChange={handleFilterChange}
              bookmarked={bookmarked}
              showBookmarked={showBookmarked}
              onToggleBookmarked={handleToggleBookmarked}
              setCurrentPage={setCurrentPage}
            />

            <div className="mx-auto  grid grid-cols-1 md:grid-cols-2  gap-x-8 gap-y-16  pt-10  lg:max-w-none w-full">
              {currentItems.map((vacancy) => (
                <VacancyCard
                  key={vacancy._id}
                  vacancy={vacancy}
                  handleBookmark={handleBookmark}
                  bookmarked={bookmarked}
                />
              ))}
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

/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { AutoComplete } from './AutoComplete';
import { FilterIcon } from '../assets/FilterIcon';
import { BookmarkedIcon } from '../assets/BookmarkedIcon';

const FilterBar = ({
  initialVacancies,
  onFilterChange,
  bookmarked,
  showBookmarked,
  onToggleBookmarked,
  currentItems,
}) => {
  const [query, setQuery] = useState('');
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (showBookmarked) {
      filterBookmarked();
    } else {
      onFilterChange(initialVacancies);
    }
  }, [bookmarked, showBookmarked]);

  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);

    const getUniqueTitles = (vacancies) =>
      vacancies.filter(
        (vacancy, index, self) =>
          vacancy.title.toLowerCase().includes(input) &&
          index ===
            self.findIndex(
              (v) => v.title.toLowerCase() === vacancy.title.toLowerCase()
            )
      );

    if (input === '') {
      setFilteredVacancies([]);
      setShowSuggestions(false);
      onFilterChange(
        showBookmarked
          ? initialVacancies.filter((vacancy) =>
              bookmarked.includes(vacancy._id)
            )
          : initialVacancies
      );
    } else {
      const uniqueFiltered = showBookmarked
        ? getUniqueTitles(currentItems)
        : getUniqueTitles(initialVacancies);

      setFilteredVacancies(uniqueFiltered);
      setShowSuggestions(true);

      const filtered = showBookmarked
        ? currentItems.filter((vacancy) =>
            vacancy.title.toLowerCase().includes(input)
          )
        : initialVacancies.filter((vacancy) =>
            vacancy.title.toLowerCase().includes(input)
          );

      onFilterChange(filtered);
    }
  };

  const handleClick = (e) => {
    setQuery(e.target.innerText);
    setFilteredVacancies([]);
    setShowSuggestions(false);
    onFilterChange(
      currentItems.filter((vacancy) =>
        vacancy.title.toLowerCase().includes(e.target.innerText.toLowerCase())
      )
    );
  };

  const filterBookmarked = () => {
    if (query.length > 0) {
      const bookmarkedVacancies = currentItems.filter((vacancy) =>
        bookmarked.includes(vacancy._id)
      );
      onFilterChange(bookmarkedVacancies);
      return;
    }
    onFilterChange(
      initialVacancies.filter((vacancy) => bookmarked.includes(vacancy._id))
    );
  };

  return (
    <div className="flex flex-row gap-4 mt-10">
      <div className="gap-6 grow relative">
        <label className="input input-bordered flex items-center gap-2 bg-white">
          <input
            type="text"
            className="grow bg-white"
            placeholder="Meklēt"
            onChange={handleSearch}
            value={query}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
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
      <div className="dropdown dropdown-bottom dropdown-end">
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
      <div>
        <div
          tabIndex={0}
          role="button"
          className="btn"
          onClick={onToggleBookmarked}
        >
          <BookmarkedIcon />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

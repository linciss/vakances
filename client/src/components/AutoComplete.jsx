import React from 'react';

export const AutoComplete = ({ filteredVacancies, handleClick }) => {
  return filteredVacancies.length ? (
    <ul className="menu p-2 shadow bg-white rounded-box w-52">
      {filteredVacancies.map((vacancy, index) => {
        return (
          <li
            key={index}
            onClick={handleClick}
            className="cursor-pointer p-2 hover:bg-base-200"
          >
            {vacancy.title}
          </li>
        );
      })}
    </ul>
  ) : (
    ''
  );
};

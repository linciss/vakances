/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { BookmarkedIcon } from '../../assets/BookmarkedIcon';
import { BookmarkInitialIcon } from '../../assets/BookmarkInitialIcon';
import { Link } from 'react-router-dom';

export const VacancyCard = ({ vacancy, bookmarked, handleBookmark }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (vacancy.tags && vacancy.tags.length > 0) {
      setTags(vacancy.tags.slice(0, 3));
    }
  }, [vacancy.tags]);

  const date = new Date(vacancy.timeCreated).toLocaleString();
  return (
    <article
      key={vacancy._id}
      className="flex max-w-xl flex-col items-start justify-between"
    >
      <div className="flex items-center gap-x-4 text-xs justify-between w-full">
        <div>
          <time dateTime={date} className="text-gray-500">
            {date.slice(0, 9)}
          </time>
          {tags && tags.length > 0 ? (
            <div className="flex gap-x-2">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-gray-500 rounded-[0.5rem] bg-base-100 px-4"
                >
                  {tag}
                </span>
              ))}
              {vacancy.tags && vacancy.tags.length > 3 && (
                <span className="text-gray-500">
                  +{vacancy.tags.length - 3}
                </span>
              )}
            </div>
          ) : (
            ''
          )}
        </div>

        <div
          className="cursor-pointer hover:scale-110 duration-300 transition-all"
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
};

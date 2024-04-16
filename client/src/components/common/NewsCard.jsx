/* eslint-disable react/prop-types */
import React from 'react';

export const NewsCard = ({ article }) => {
  return (
    <div className="mb-8 shadow-xl p-4 cursor-pointer">
      <img
        src={
          article.urlToImage ||
          'https://qph.cf2.quoracdn.net/main-qimg-1a4bafe2085452fdc55f646e3e31279c-lq'
        }
        alt="placeholder"
        className="h-48 w-full object-cover"
      />
      <h2 className="font-bold text-2xl mt-4">{article.title}</h2>
    </div>
  );
};

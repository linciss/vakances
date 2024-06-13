import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { ArticlesContext } from '../../context/ArticlesContext';

const News = () => {
  const { articles } = useContext(ArticlesContext);

  return (
    <div className="container max-w-[1280px]">
      <div className="py-12">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Jaunumi
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Uzzini aktuālākos jaunumus IT sfērā
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t border-gray-300 w-full mt-8">
          <div className="grid gap-x-8 gap-y-16 pt-10 lg:max-w-none w-full">
            {articles.map((article, index) => {
              const date = new Date(article.publishedAt).toLocaleString();

              const base64String = btoa(
                Array.prototype.map
                  .call(new Uint8Array(article.imgId.data.data), (ch) =>
                    String.fromCharCode(ch)
                  )
                  .join('')
              );

              if (index === 0) {
                return (
                  <article
                    key={article._id}
                    className="flex flex-col items-start justify-between md:col-span-2"
                  >
                    <div className="w-full h-96 bg-center bg-cover rounded-t-box">
                      {/* DISPLAY THE IMAGE HERE  */}
                      <img
                        src={`data:image/avif;base64,${base64String}`}
                        alt={article.title}
                        className="w-full h-full bg-cover"
                      />
                    </div>
                    <div className="flex items-center gap-x-4 text-xs mt-4">
                      <time
                        dateTime={article.publishedAt}
                        className="text-gray-500"
                      >
                        {date.slice(0, 9)}
                      </time>
                    </div>
                    <div className="group relative">
                      <h3 className="mt-3 text-2xl font-semibold leading-8 text-gray-900 group-hover:text-gray-600">
                        <Link to={`/news/${article._id}`}>
                          <span className="absolute inset-0" />
                          {article.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-4 text-base leading-7 text-gray-600">
                        {article.content}
                      </p>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={article._id}
                  className="flex flex-col items-start justify-between max-w-xl"
                >
                  <img
                    src={`data:image/avif;base64,${base64String}`}
                    alt={article.title}
                    className="w-full h-full bg-cover"
                  />
                  <div className="flex items-center gap-x-4 text-xs mt-4">
                    <time
                      dateTime={article.publishedAt}
                      className="text-gray-500"
                    >
                      {date.slice(0, 9)}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link to={`/news/${article._id}`}>
                        <span className="absolute inset-0" />
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {article.content}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;

import React, { useContext } from 'react';

import { NewsCard } from '../../components/common/NewsCard';

import { ArticlesContext } from '../../context/ArticlesContext';

const Home = () => {
  const articles = useContext(ArticlesContext);

  return (
    <div className="container mt-8 m-auto">
      <div className="flex flex-col flex-wrap">
        <h1 className="font-bold text-6xl">Dienas jaunumi</h1>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 justify-between mt-20 ">
            {articles &&
              articles
                .slice(0, 9)
                .map((article, index) => (
                  <NewsCard article={article} key={index} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

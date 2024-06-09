// src/ViewNews.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';

const newsItems = [
  {
    id: 1,
    title: 'I Built A Successful Blog In One Year',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
    imageUrl:
      'https://images.adsttc.com/media/images/54f1/5536/e58e/ce7e/1000/0239/large_jpg/IMG_2786_D.jpg?1425102118',
    timeCreated: '2024-01-01T12:00:00Z',
  },
  {
    id: 2,
    title: 'How To Learn Programming Fast',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
    imageUrl:
      'https://www.1training.org/wp-content/uploads/2015/01/Information-Technology-and-Cloud-Computing-1024x870-e1422276882760-1.jpg',
    timeCreated: '2024-02-01T12:00:00Z',
  },
  {
    id: 3,
    title: 'Top 10 JavaScript Frameworks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In pretium nec senectus erat. Et malesuada lobortis.',
    imageUrl:
      'https://www.simplilearn.com/ice9/free_resources_article_thumb/Best-Programming-Languages-to-Start-Learning-Today.jpg',
    timeCreated: '2024-03-01T12:00:00Z',
  },
  // Add more news items as needed
];

const ViewNews = () => {
  const { id } = useParams();
  const newsItem = newsItems.find((item) => item.id === parseInt(id));

  if (!newsItem) {
    return <div>News item not found</div>;
  }

  const relatedNewsItems = newsItems
    .filter((item) => item.id !== parseInt(id))
    .slice(0, 2);

  return (
    <div className="container max-w-[1280px] mx-auto py-12">
      <div
        className="w-full h-96 bg-center bg-cover rounded-t-box"
        style={{ backgroundImage: `url(${newsItem.imageUrl})` }}
      ></div>
      <div className="flex flex-col lg:flex-row mt-6">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {newsItem.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {newsItem.description}
          </p>
        </div>
        <div className="lg:w-1/3 lg:pl-8 mt-12 lg:mt-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Citi jaunumi
          </h2>
          <div className="grid gap-8 mt-6">
            {relatedNewsItems.map((relatedNewsItem) => (
              <article
                key={relatedNewsItem.id}
                className="flex flex-col items-start justify-between"
              >
                <div
                  className="w-full h-48 bg-center bg-cover rounded-t-box"
                  style={{
                    backgroundImage: `url(${relatedNewsItem.imageUrl})`,
                  }}
                ></div>
                <div className="flex items-center gap-x-4 text-xs mt-2">
                  <time
                    dateTime={relatedNewsItem.timeCreated}
                    className="text-gray-500"
                  >
                    {new Date(relatedNewsItem.timeCreated).toLocaleDateString()}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/news/${relatedNewsItem.id}`}>
                      <span className="absolute inset-0" />
                      {relatedNewsItem.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {relatedNewsItem.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewNews;

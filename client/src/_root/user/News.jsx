import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news/all');
        if (response.status === 200) {
          setNewsItems(response.data);
        } else {
          setError('Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

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
            {newsItems.map((newsItem, index) => {
              const date = new Date(newsItem.publishedAt).toLocaleString();

              return (
                <article
                  key={newsItem._id}
                  className={`flex flex-col items-start justify-between ${
                    index === 0 ? 'md:col-span-2' : 'max-w-xl'
                  }`}
                >
                  <div
                    className={`w-full ${index === 0 ? 'h-96' : 'h-72'} bg-center bg-cover rounded-t-box`}
                    style={{ backgroundImage: `url(${newsItem.imageUrl})` }}
                  ></div>
                  <div className="flex items-center gap-x-4 text-xs mt-4">
                    <time dateTime={newsItem.publishedAt} className="text-gray-500">
                      {date.slice(0, 9)}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link to={`/news/${newsItem._id}`}>
                        <span className="absolute inset-0" />
                        {newsItem.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {newsItem.content}
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
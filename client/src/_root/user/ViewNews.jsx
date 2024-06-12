import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ViewNews = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNewsItems, setRelatedNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await axios.get(`/api/news/${id}`);
        if (response.status === 200) {
          setNewsItem(response.data);
        } else {
          setError('Failed to fetch news item');
        }
      } catch (err) {
        console.error('Error fetching news item:', err);
        setError('Failed to fetch news item');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedNewsItems = async () => {
      try {
        const response = await axios.get('/api/news/all');
        if (response.status === 200) {
          const allNewsItems = response.data;
          const relatedItems = allNewsItems
            .filter((item) => item.id !== parseInt(id))
            .slice(0, 2);
          setRelatedNewsItems(relatedItems);
        } else {
          setError('Failed to fetch related news items');
        }
      } catch (err) {
        console.error('Error fetching related news items:', err);
        setError('Failed to fetch related news items');
      }
    };

    fetchNewsItem();
    fetchRelatedNewsItems();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!newsItem) {
    return <div>News item not found</div>;
  }

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
            {newsItem.content}
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
                {/* <div className="flex items-center gap-x-4 text-xs mt-2">
                  <time
                    dateTime={relatedNewsItem.timeCreated}
                    className="text-gray-500"
                  >
                    {new Date(relatedNewsItem.timeCreated).toLocaleDateString()}
                  </time>
                </div> */}
                <div className="group relative">
                  <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to={`/news/${relatedNewsItem.id}`}>
                      <span className="absolute inset-0" />
                      {relatedNewsItem.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {relatedNewsItem.content}
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

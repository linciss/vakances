import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArticlesContext } from '../../context/ArticlesContext';

const ViewNews = () => {
  const { id } = useParams();
  const { articles } = useContext(ArticlesContext);
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setRelatedArticles(
      articles.filter((article) => article._id !== id).slice(0, 2) || []
    );
  }, [articles, id]);

  const fetcharticle = async () => {
    try {
      const response = await axios.get(`/api/news/${id}`);
      if (response.status === 200) {
        setArticle(response.data);
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

  useEffect(() => {
    fetcharticle();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!article) {
    return <div>News item not found</div>;
  }

  const base64String = btoa(
    Array.prototype.map
      .call(new Uint8Array(article.imgId.data.data), (ch) =>
        String.fromCharCode(ch)
      )
      .join('')
  );

  const date = new Date(article.publishedAt).toLocaleDateString();

  return (
    <div className="container max-w-[1280px] mx-auto py-12">
      <img
        src={`data:image/avif;base64,${base64String}`}
        alt={article.title}
        className="w-full h-96 bg-center object-cover rounded-t-box"
      />

      <div className="flex flex-col lg:flex-row mt-6">
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <h2>{date.slice(0, 9)}</h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {article.content}
          </p>
        </div>
        <div className="lg:w-1/3 lg:pl-8 mt-12 lg:mt-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Citi jaunumi
          </h2>
          <div className="grid gap-8 mt-6">
            {relatedArticles.map((article) => {
              const date = new Date(article.publishedAt).toLocaleDateString();
              const base64String = btoa(
                Array.prototype.map
                  .call(new Uint8Array(article.imgId.data.data), (ch) =>
                    String.fromCharCode(ch)
                  )
                  .join('')
              );
              return (
                <article
                  key={article._id}
                  className="flex flex-col items-start justify-between"
                >
                  <img
                    src={`data:image/avif;base64,${base64String}`}
                    alt={article.title}
                    className="w-full h-48 bg-center object-cover rounded-t-box"
                  />
                  <div className="flex items-center gap-x-4 text-xs mt-2">
                    <time dateTime={date} className="text-gray-500">
                      {date.slice(0, 10)}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-2 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <Link to={`/news/${article._id}`}>
                        <span className="absolute inset-0" />
                        {article.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {article.description}
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

export default ViewNews;

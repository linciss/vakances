import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Dots } from '../../../../assets/Dots';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { EditIcon } from '../../../../assets/EditIcon';
import { AuthContext } from '../../../../context/AuthContext';
import { Spinner } from '../../../../components/common/Spinner';

const NewsView = () => {
  const [articles, setArticles] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const getArticles = useCallback(async () => {
    try {
      const res = await axios.get('/api/news/all');
      if (res.status === 200) {
        setArticles(res.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        setUser({ isLoggedIn: false });
        navigate('/');
      }
    }
  }, [setUser, navigate]);

  useEffect(() => {
    getArticles();
  }, [getArticles]);

  const deleteArticle = async (id) => {
    try {
      const res = await axios.delete(`/api/news/${id}`);
      if (res.status === 200) {
        getArticles(); // Re-fetch articles after deletion
      }
    } catch (err) {
      console.log(err);
      if (err.response?.status === 401) {
        setUser({ isLoggedIn: false });
        navigate('/');
      }
    }
  };

  return (
    <div className="">
      <div className="flex justify-between ">
        <h1 className="text-4xl font-bold">Jaunumi</h1>
        <Link
          to="/admin/news/new"
          className="btn btn-outline hover:text-black hover:bg-base-100"
        >
          + Izveidot
        </Link>
      </div>

      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8">
        {articles ? (
          <table className="table mt-8">
            <thead>
              <tr>
                <th></th>
                <th>Nosaukums</th>
                <th>Izveidošanas datums</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{article.title}</td>
                  <td>{article.publishedAt.slice(0, 10)}</td>

                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="">
                        <Dots />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-white rounded-box w-[150px]"
                      >
                        <li className="w-full text-center">
                          <Link
                            to={`/admin/news/${article._id}`}
                            className="text-xl text-center"
                          >
                            <EditIcon />
                            Rediģēt
                          </Link>
                        </li>
                        <li
                          className="w-full text-center"
                          onClick={() => deleteArticle(article._id)}
                        >
                          <p className="text-xl text-center cursor-pointer">
                            <DeleteIcon />
                            Dzēst
                          </p>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default NewsView;

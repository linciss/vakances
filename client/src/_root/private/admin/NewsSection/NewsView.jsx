import React, { useState } from 'react';
import { Dots } from '../../../../assets/Dots';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { EditIcon } from '../../../../assets/EditIcon';

const NewsView = () => {
  const [articles, setArticles] = useState([
    {
      title: 'Title',
      timeCreated: '2021-10-10',
      tags: 'Tags',
    },
    {
      title: 'Title',
      timeCreated: '2021-10-10',
      tags: 'Tags',
    },
  ]);
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Jaunumi</h1>
      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8">
        {articles ? (
          <table className="table mt-8">
            <thead>
              <tr>
                <th></th>
                <th>Nosaukums</th>
                <th>Izveidošanas datums</th>
                <th>Tagi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{article.title}</td>
                  <td>{article.timeCreated.slice(0, 10)}</td>
                  <td>{article.tags}</td>
                  <td>
                    <div className="dropdown relative overflow-visible">
                      <div tabIndex={0} role="button" className="">
                        <Dots />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow  bg-white rounded-box w-[85px]  "
                      >
                        <li className="w-[70px]">
                          <DeleteIcon />
                        </li>
                        <li className="w-[70px]">
                          <EditIcon />
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="loading loading-spinner loading-lg"></span>
        )}
      </div>
    </div>
  );
};

export default NewsView;

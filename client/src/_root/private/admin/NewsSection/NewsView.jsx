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
  ]);
  return (
    <div className="overflow-x-auto">
      {articles ? (
        <table className="table ">
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
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <Dots />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-[85px]  "
                    >
                      <li className="w-[70px]">
                        <div>
                          <DeleteIcon />
                        </div>
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
  );
};

export default NewsView;

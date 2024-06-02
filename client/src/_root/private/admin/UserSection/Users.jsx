import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Dots } from '../../../../assets/Dots';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { EditIcon } from '../../../../assets/EditIcon';

const Users = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([
    {
      username: 'John Doe',
      role: 'Admin',
      timeCreated: '2021-10-10',
    },
  ]);
  return (
    <div className="">
      <h1 className="text-4xl font-bold">Lietotāji</h1>
      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8">
        {users ? (
          <table className="table mt-8">
            <thead>
              <tr>
                <th></th>
                <th>Lietotājvārds</th>
                <th>Privilēģijas</th>
                <th>Izveidošanas datums</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>{user.timeCreated.slice(0, 10)}</td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="">
                        <Dots />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow  bg-white rounded-box w-[150px]  "
                      >
                        <li className="w-full">
                          <p className="text-xl text-center">Rediģēt</p>
                        </li>
                        <li className="w-full text-center">
                          <p className="text-xl text-center">Dzēst</p>
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
export default Users;

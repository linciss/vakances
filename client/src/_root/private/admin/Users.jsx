import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Dots } from '../../../assets/Dots';
import { DeleteIcon } from '../../../assets/DeleteIcon';
import { EditIcon } from '../../../assets/EditIcon';

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
    <div className="overflow-x-auto">
      {users ? (
        <table className="table">
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
                      className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-[85px]"
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
export default Users;

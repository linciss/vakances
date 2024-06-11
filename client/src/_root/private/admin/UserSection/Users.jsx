import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Dots } from '../../../../assets/Dots';
import { DeleteIcon } from '../../../../assets/DeleteIcon';
import { EditIcon } from '../../../../assets/EditIcon';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spinner } from '../../../../components/common/Spinner';

const Users = () => {
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const activeUser = user;

  const getAllUsers = async () => {
    await axios
      .get('/api/users/all', { withCredentials: true })
      .catch((err) => {
        navigate('/admin');
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
        }
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setUsers(data);
      });
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`/api/users/${id}`, { withCredentials: true })
      .catch((err) => {
        console.log(err);
      });
    getAllUsers();
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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
                    {user.role === 'root' ||
                    activeUser.username === user.username ? (
                      ''
                    ) : (
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="">
                          <Dots />
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow  bg-white rounded-box w-[150px]"
                        >
                          <li className="w-full">
                            <Link className=" text-xl text-center">
                              <EditIcon />
                              Rediģēt
                            </Link>
                          </li>

                          <li
                            className="w-full text-center"
                            onClick={() => deleteUser(user._id)}
                          >
                            <p className="text-xl text-center">
                              <DeleteIcon />
                              Dzēst
                            </p>
                          </li>
                        </ul>
                      </div>
                    )}
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
export default Users;

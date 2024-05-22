import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const Users = () => {
  const { user } = useContext(AuthContext);
  return <>Users</>;
};
export default Users;

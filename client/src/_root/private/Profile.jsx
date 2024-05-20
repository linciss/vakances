import React, { useContext } from 'react';
import userProfile from '../../assets/userProfileImage.png';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container ">
      <div className="m-auto flex justify-center mt-20 flex-wrap gap-8">
        <img src={userProfile} className="w-1/3 " />
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-4xl">Vārds: {user.username}</h1>
          <h2 className="font-bold text-2xl">Privilēģijas: {user.role}</h2>
          <h2 className="font-bold text-2xl">
            Konts taisīts: {user.timeCreated.slice(0, 10)}
          </h2>
          <h2 className="font-bold text-2xl">
            Pēdējais Login: {new Date(user.lastLogin).toLocaleString()}
          </h2>
          <div className="flex gap-4 ">
            <Link to="/profile/change-username">
              <button className="bg-mainGreen text-white p-2 rounded-md">
                Mainīt lietotājvārdu
              </button>
            </Link>
            <Link to="/profile/change-password">
              <button className="bg-mainGreen text-white p-2 rounded-md">
                Mainīt paroli
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

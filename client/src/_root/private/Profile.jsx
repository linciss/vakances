import React, { useContext } from 'react';
import userProfile from '../../assets/userProfileImage.png';
import { AuthContext } from '../../context/AuthContext';

import { useForm } from 'react-hook-form';
import PasswordForms from '../../_auth/forms/PasswordForms';
import { UsernameForms } from '../../_auth/forms';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const error = false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="container max-w-[1280px] pb-1">
      <div className="m-auto flex flex-col md:flex-row justify-evenly mt-20 gap-8">
        <img src={userProfile} className="w-full md:w-1/3 " />
        <div className="flex flex-col gap-4 text-center justify-center">
          <h1 className="font-bold text-4xl">Vārds: {user.username}</h1>
          <h2 className="font-bold text-2xl">Privilēģijas: {user.role}</h2>
          <h2 className="font-bold text-2xl">
            Konts taisīts: {user.timeCreated.slice(0, 10)}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:max-w-5xl justify-center items-center mx-auto">
        {/* CHANGE PASS  */}
        <PasswordForms />

        {/* CHANGE NICK */}
        <UsernameForms />
      </div>
    </div>
  );
};

export default Profile;

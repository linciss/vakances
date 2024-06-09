import React, { useContext } from 'react';
import userProfile from '../../assets/userProfileImage.png';
import { AuthContext } from '../../context/AuthContext';

import { useForm } from 'react-hook-form';
import PasswordForms from '../../_auth/forms/PasswordForms';

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
      <div>
        <PasswordForms />
      </div>
      {/* CHANGE NICK */}
      <div>
        <form className="shadow-xl px-8 py-10 gap-8  flex flex-col w-[90%] md:w-[80%] lg:w-2/3 m-auto mb-8 mt-8">
          <h2 className="text-4xl font-bold">Mainīt lietotājvārdu</h2>
          {(errors.username && errors.username.type === 'required') ||
          (errors.password && errors.password.type === 'required') ||
          error ? (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-white">
                Please fill in all required fields
              </span>
            </div>
          ) : null}
          <label className="form-control w-full m-auto">
            <div className="label">
              <span className="label-text">Jaunais lietotājvārds</span>
            </div>
            <input
              id="username"
              type="text"
              className="input input-bordered w-full bg-white"
              required
              aria-invalid={errors.username ? 'true' : 'false'}
              {...register('username', { required: true })}
            />
          </label>
          <label className="form-control w-full m-auto">
            <div className="label">
              <span className="label-text">Parole</span>
            </div>
            <input
              id="password2"
              type="password"
              className="input input-bordered w-full bg-white"
              required
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password2', { required: true })}
            />
          </label>

          <button
            type="submit"
            className="btn btn-base-300 w-full max-w-sm mx-auto"
          >
            Izveidot
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

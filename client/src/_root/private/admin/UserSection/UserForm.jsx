import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useAsyncValue, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const { setUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    await axios
      .post('/api/users/new', data, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === 400) {
          setError(!error);
          return;
        }
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
        navigate('/admin');
      });
  };

  return (
    <>
      <h1 className="text-4xl font-bold border-b border-gray-300 pb-8">
        Izveidot jaunu lietotāju
      </h1>
      <div className="mx-auto max-w-4xl px-6 lg:px-8 w-full mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md px-8 py-10 gap-8  flex flex-col w-[90%] md:w-[80%] lg:w-2/3 m-auto mb-8 mt-8"
        >
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
              <span className="label-text">Lietotājvārds</span>
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
              id="password"
              type="password"
              className="input input-bordered w-full bg-white"
              required
              aria-invalid={errors.password ? 'true' : 'false'}
              {...register('password', { required: true })}
            />
          </label>
          <label className="form-control w-full m-auto">
            <div className="label">
              <span className="label-text">Privilēģijas</span>
            </div>
            <select
              className="select select-bordered bg-white"
              {...register('role')}
            >
              <option defaultValue={'mod'} value={'mod'}>
                Moderators
              </option>
              <option value={'admin'}>Administrators</option>
            </select>
          </label>
          <button
            type="submit"
            className="btn btn-base-300 w-full max-w-sm mx-auto"
          >
            Izveidot
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;

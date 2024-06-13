import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const fetchUser = async () => {
    await axios
      .get(`/api/users/${id}`, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/admin/users');
          return;
        }
        setError(err.response.data);
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

        setUser(data);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await axios
      .put(`/api/users/${id}`, data, { withCredentials: true })
      .catch((err) => {
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
          return;
        }
        setError(err.response.data);
        return;
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) return;
        setSuccess(data);
        setError(null);
        setTimeout(() => {
          navigate('/admin/users');
        }, 2000);
      });

    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <>
      <h1 className="text-4xl font-bold border-b border-gray-300 pb-8">
        Rediģēt lietotāju {user.username || ''}
      </h1>
      <div className="mx-auto max-w-4xl px-6 lg:px-8 w-full mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md px-8 py-10 gap-8  flex flex-col w-[90%] md:w-[80%] lg:w-2/3 m-auto mb-8 mt-8"
        >
          {error ? (
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
              <span className="text-white">{error}</span>
            </div>
          ) : null}
          {success ? (
            <div role="alert" className="alert alert-success">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-black">{success}</span>
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
              placeholder={user.username}
              {...register('username')}
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
              {...register('password')}
            />
          </label>
          <button
            type="submit"
            className="btn btn-base-300 w-full max-w-sm mx-auto"
          >
            Saglabāt
          </button>
        </form>
      </div>
    </>
  );
};

export default UserEdit;

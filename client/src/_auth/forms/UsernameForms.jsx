import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsernameForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    await axios
      .put('http://localhost:5000/api/users/change-username', data)
      .catch((err) => {
        if (err.response.status === 401) {
          const responseData = err.response.data;
          if (responseData.error === 'username_is_the_same') {
            setError(
              'Jaunais lietotājvārds nedrīkst būt tāds pats kā iepriekšējais!'
            );
            return;
          } else if (responseData.error === 'fill_all_fields') {
            setError('Lūdzu aizpildiet visus laukus!');
            return;
          } else if (responseData.error === 'incorrect_password') {
            setError('Nepareiza parole!');
            return;
          } else if (responseData.error === 'user_exists') {
            setError('Lietotājs ar šādu lietotājvārdu jau eksistē!');
            return;
          } else {
            setUser((prevUser) => ({
              ...prevUser,
              ...Object.keys(prevUser).reduce(
                (acc, key) => ({ ...acc, [key]: null }),
                {}
              ),
              isLoggedIn: false,
            }));
            navigate('/login');
            return;
          }
        }
        setError(err.response.data);
        navigate('/');
        setSuccess(null);
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
        setSuccess('Lietotājvārds mainīts!');
        setTimeout(() => {
          navigate('/');
          setSuccess(null);
        }, 1000);
        setError(null);
      });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
    if (error || errors) {
      setValue('password', '');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-xl px-8 py-10 gap-8  flex flex-col w-full lg:w-2/3 m-auto mb-8 mt-8"
    >
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
          <span className="text-white">Please fill in all required fields</span>
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
          <span>{success}</span>
        </div>
      ) : null}
      <label className="form-control w-full m-auto">
        <div className="label">
          <span className="label-text">Jaunais lietotājvārds</span>
        </div>
        <input
          id="newUsername"
          type="text"
          className="input input-bordered w-full bg-white"
          required
          aria-invalid={errors.username ? 'true' : 'false'}
          {...register('newUsername', { required: true })}
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

      <button
        type="submit"
        className="btn btn-base-300 w-full max-w-sm mx-auto"
      >
        Izveidot
      </button>
    </form>
  );
};

export default UsernameForms;

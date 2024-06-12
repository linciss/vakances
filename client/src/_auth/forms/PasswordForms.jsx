import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await axios
      .put('http://localhost:5000/api/users/change-password', data)
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err.response.data);
          setError(err.response.data);
          return;
        } else if (err.response.status === 429) {
          setError('Pārāk daudz pieprasījumu! Lūdzu mēģiniet vēlāk!');
          return;
        } else if (err.response.status === 400) {
          setError('Parolēm jābūt no 6 līdz 20 simbolu garām!');
          return;
        }
        setUser((prevUser) => ({
          ...prevUser,
          ...Object.keys(prevUser).reduce(
            (acc, key) => ({ ...acc, [key]: null }),
            {}
          ),
          isLoggedIn: false,
        }));
        navigate('/login');
        setSuccess(null);
        return;
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
        setSuccess('Parole nomainīta veiksmīgi!');
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
      className="shadow-xl px-8 py-10 gap-8 w-full  flex flex-col lg:w-2/3 m-auto mb-8 mt-8"
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
          <span>{success}</span>
        </div>
      ) : null}
      <h2 className="text-4xl font-bold">Mainīt paroli</h2>

      <label className="form-control w-full m-auto">
        <div className="label">
          <span className="label-text">Pašreizējā parole</span>
        </div>
        <input
          id="password"
          type="password"
          className="input input-bordered w-full bg-white"
          required
          aria-invalid={errors.currPassword ? 'true' : 'false'}
          {...register('password', {
            required: true,
            maxLength: 20,
            minLength: 6,
          })}
        />
      </label>

      <label className="form-control w-full m-auto">
        <div className="label">
          <span className="label-text">Jaunā parole</span>
        </div>
        <input
          id="newPassword"
          type="password"
          className="input input-bordered w-full bg-white"
          required
          aria-invalid={errors.currPassword ? 'true' : 'false'}
          {...register('newPassword', {
            required: true,
            maxLength: 20,
            minLength: 6,
          })}
        />
      </label>

      <label className="form-control w-full m-auto">
        <div className="label">
          <span className="label-text">Jaunā parole atkārtoti</span>
        </div>
        <input
          id="newPasswordVerify"
          type="password"
          className="input input-bordered w-full bg-white"
          required
          aria-invalid={errors.currPassword ? 'true' : 'false'}
          {...register('newPasswordVerify', {
            required: true,
            maxLength: 20,
            minLength: 6,
          })}
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-base-300 w-full max-w-sm mx-auto"
      >
        {isSubmitting ? 'Maina...' : 'Mainīt paroli'}
      </button>
    </form>
  );
};

export default PasswordForms;

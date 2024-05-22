import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const NewSignInForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await axios
      .post('/api/auth/login', data)
      .catch((err) => {
        if (err.response.status === 401) {
          setError(err.response.data);
          return;
        } else if (err.response.status === 429) {
          setError('Pārāk daudz pieprasījumu! Lūdzu mēģiniet vēlāk!');
          return;
        }
        setError('Minimālais simbolu skaits nav sasniegts!');
        console.log(err);
      })
      .then((res) => {
        if (!res || !res.statusText === 'OK' || res.status >= 400) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setUser(data);
        navigate('/');
      });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
    if (error || errors) {
      setValue('password', '');
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-full mt-52">
      <div className="w-full p-6 m-auto bg-base-300 rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Pieslēdzies
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error ? (
            <div
              role="alert"
              className="bg-red-500 p-4 text-white text-xl rounded-md text-center transition-all duration-200 animate-fadeIn"
            >
              {error}
            </div>
          ) : null}
          <div>
            <label className="label" htmlFor="username">
              <span className="text-base label-text">Lietotājvārds</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="Lietotājvārds"
              aria-invalid={errors.username || error ? 'true' : 'false'}
              maxLength={30}
              className={`w-full input input-bordered ${
                errors.username ? 'border-red-700' : 'border-gray-300'
              }`}
              {...register('username', {
                required: true,
                maxLength: 20,
                minLength: 3,
              })}
            />
            {errors.username && errors.username.type === 'minLength' ? (
              <div role="alert" className="text-red-500 text-xs">
                Minimālo simbolu skaits ir 3!
              </div>
            ) : null}
          </div>

          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text">Parole</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Parole"
              aria-invalid={errors.password || error ? 'true' : 'false'}
              className={`w-full input input-bordered ${
                errors.password ? 'border-red-700' : 'border-gray-300'
              }`}
              {...register('password', {
                required: true,
                maxLength: 20,
                minLength: 6,
              })}
            />
            {errors.password && errors.password.type === 'minLength' ? (
              <div className="text-red-500 text-xs">
                Miniālais simbolu skaits ir 6!
              </div>
            ) : null}
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary btn btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Pieslēdzies...' : 'Pieslēgties'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

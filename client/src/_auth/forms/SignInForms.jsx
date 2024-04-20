import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    await axios
      .post('/api/auth/login', data)
      .catch((err) => {
        setError(err.response.data);
        return;
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

        navigate('/profile');
      });
  };

  return (
    <div className="m-auto md:w-3/4 lg:w-1/2 mt-20">
      <div className="m-auto">
        <h1 className=" text-5xl md:text-7xl font-bold text-center">
          Pieslēdzies
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-xl px-8 py-10 bg-mainGreen flex gap-8 flex-col mt-20 rounded-md"
      >
        {(errors.username && errors.username.type === 'required') ||
        (errors.password && errors.password.type === 'required') ? (
          <div
            role="alert"
            className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            Lūdzu aizpildiet visus laukus!
          </div>
        ) : null}
        {(errors.username && errors.username.type === 'maxLength') ||
        (errors.password && errors.password.type === 'maxLength') ? (
          <div
            role="alert"
            className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            Maksimālo simbolu skatis pārsniegts!
          </div>
        ) : null}
        {error ? (
          <div
            role="alert"
            className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            {error}
          </div>
        ) : null}
        <div>
          <label
            htmlFor="username"
            className={`text-white text-lg font-semibold`}
          >
            Lietotājvārds
          </label>
          <input
            id="username"
            aria-invalid={errors.username ? 'true' : 'false'}
            maxLength={30}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('username', { required: true, maxLength: 30 })}
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className={`text-white text-lg font-semibold`}
          >
            Parole
          </label>
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? 'true' : 'false'}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('password', { required: true, maxLength: 30 })}
          />
        </div>

        <button
          type="submit"
          className=" text-white font-bold py-4 rounded-md bg-secondaryGreen transition-all duration-200 hover:animate-pulse"
        >
          Pieslēgties
        </button>
      </form>
    </div>
  );
};

export default SignInForms;

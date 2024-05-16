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
      .put('/api/auth/change-username', data)
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
        if (!res || !res.status === 200) {
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
    <div className="m-auto md:w-3/4 lg:w-1/2 mt-20">
      <div className="m-auto">
        <h1 className=" text-5xl md:text-7xl font-bold text-center">
          Mainīt lietotājvārdu
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-xl px-8 py-10 bg-mainGreen flex gap-8 flex-col mt-20 rounded-md"
      >
        {/* ERROR HANDLING!!!! */}
        {(errors.newUsername && errors.newUsername.type === 'required') ||
        (errors.password && errors.password.type === 'required') ? (
          <div
            role="alert"
            className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            Lūdzu aizpildiet visus laukus!
          </div>
        ) : null}
        {(errors.newUsername && errors.newUsername.type === 'maxLength') ||
        (errors.password && errors.password.type === 'maxLength') ? (
          <div
            role="alert"
            className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            Maksimālo simbolu skatis pārsniegts!
          </div>
        ) : null}
        {errors.newUsername && errors.newUsername.type === 'minLength' ? (
          <div className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn">
            Miniālais simbolu skaits lietotājvārdā ir 3!
          </div>
        ) : null}
        {errors.password && errors.password.type === 'minLength' ? (
          <div className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn">
            Parole ir pārāk īsa!
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
        {success ? (
          <div
            role="alert"
            className="bg-green-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            {success}
          </div>
        ) : null}

        <div>
          <label
            htmlFor="newUsername"
            className={`text-white text-lg font-semibold`}
          >
            Jaunais lietotājvārds
          </label>
          <input
            id="newUsername"
            type="text"
            aria-invalid={errors.newUsername ? 'true' : 'false'}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('newUsername', {
              required: true,
              maxLength: 20,
              minLength: 3,
            })}
          />
        </div>

        <div>
          <label
            htmlFor="passwordVerify"
            className={`text-white text-lg font-semibold`}
          >
            Parole
          </label>
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? 'true' : 'false'}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('password', {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className=" text-white font-bold py-4 rounded-md bg-secondaryGreen transition-all duration-200 hover:animate-pulse"
        >
          Mainīt lietotājvārdu
        </button>
      </form>
    </div>
  );
};

export default UsernameForms;

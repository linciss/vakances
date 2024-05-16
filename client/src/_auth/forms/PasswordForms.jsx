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
      .put('/api/auth/change-password', data)
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
        if (!res || !res.status === 200) {
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
      setValue('currPassword', '');
    }
  };

  return (
    <div className="m-auto md:w-3/4 lg:w-1/2 mt-20">
      <div className="m-auto">
        <h1 className=" text-5xl md:text-7xl font-bold text-center">
          Mainīt paroli
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-xl px-8 py-10 bg-mainGreen flex gap-8 flex-col mt-20 rounded-md"
      >
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
            htmlFor="currPassword"
            className={`text-white text-lg font-semibold`}
          >
            Pašreizējā parole
          </label>
          {errors.currPassword && errors.currPassword.type === 'minLength' ? (
            <div className="text-red-500 text-xs">
              Miniālais simbolu skaits ir 6!
            </div>
          ) : null}
          <input
            id="currPassword"
            aria-invalid={errors.currPassword ? 'true' : 'false'}
            type="password"
            maxLength={30}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('currPassword', {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className={`text-white text-lg font-semibold`}
          >
            Jaunā parole
          </label>
          {errors.newPassword && errors.newPassword.type === 'minLength' ? (
            <div className="text-red-500 text-xs">
              Miniālais simbolu skaits ir 6!
            </div>
          ) : null}
          <input
            id="newPassword"
            type="password"
            aria-invalid={errors.newPassword ? 'true' : 'false'}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('newPassword', {
              required: true,
              maxLength: 20,
              minLength: 1,
            })}
          />
        </div>

        <div>
          <label
            htmlFor="newPasswordVerify"
            className={`text-white text-lg font-semibold`}
          >
            Jaunā parole atkārtoti
          </label>
          {errors.newPasswordVerify &&
          errors.newPasswordVerify.type === 'minLength' ? (
            <div className="text-red-500 text-xs">
              Miniālais simbolu skaits ir 6!
            </div>
          ) : null}
          <input
            id="newPasswordVerify"
            type="password"
            aria-invalid={errors.newPasswordVerify ? 'true' : 'false'}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('newPasswordVerify', {
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
          {isSubmitting ? 'Maina...' : 'Mainīt paroli'}
        </button>
      </form>
    </div>
  );
};

export default PasswordForms;

import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthContext';

const PasswordForms = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { error, success, changePassword } = useContext(AuthContext);

  const onSubmit = (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    changePassword(data);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
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
        {/* ERROR HANDLING!!!! */}
        {(errors.currPassword && errors.currPassword.type === 'required') ||
        (errors.newPassword && errors.newPassword.type === 'required') ||
        (errors.newPasswordVerify &&
          errors.newPasswordVerify.type === 'required') ? (
          <div
            role="alert"
            className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
          >
            Lūdzu aizpildiet visus laukus!
          </div>
        ) : null}
        {(errors.currPassword && errors.currPassword.type === 'maxLength') ||
        (errors.newPassword && errors.newPassword.type === 'maxLength') ||
        (errors.newPasswordVerify &&
          errors.newPasswordVerify.type === 'maxLength') ? (
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
          <input
            id="currPassword"
            aria-invalid={errors.currPassword ? 'true' : 'false'}
            type="password"
            maxLength={30}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('currPassword', { required: true, maxLength: 20 })}
          />
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className={`text-white text-lg font-semibold`}
          >
            Jaunā parole
          </label>
          <input
            id="newPassword"
            type="password"
            aria-invalid={errors.newPassword ? 'true' : 'false'}
            className="block w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border border-[#ACE6BB] rounded-md"
            {...register('newPassword', {
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
            Jaunā parole atkārtoti
          </label>
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
          Mainīt paroli
        </button>
      </form>
    </div>
  );
};

export default PasswordForms;

/* eslint-disable react/prop-types */
import React from 'react';
import FileUpload from './FileUpload';

export const VacancyModal = ({
  handleSubmit,
  onSubmit,
  success,
  error,
  inputDetail,
  errors,
  register,
  setValue,
  control,
}) => {
  return (
    <dialog id="my_modal_1" className="modal  w-full  max-w-2xl mx-auto">
      <div className="modal-box  mx-auto  w-full max-w-full bg-white">
        <h3 className="font-bold text-lg">Piesakies vakancei</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-2 gap-8 rounded-md  flex flex-col w-full"
          encType="multipart/form-data"
        >
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
          ) : (
            ''
          )}
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
              <span className="text-white">
                Lūdzu aizpildiet visus obligātos laukus
              </span>
            </div>
          ) : null}
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
            {inputDetail.map((input, i) => (
              <label key={i} className="form-control w-full  m-auto">
                <div className="label">
                  <span className="label-text">{input.label}</span>
                </div>
                <input
                  id={input.label}
                  type={input.type}
                  className="input input-bordered w-full bg-white"
                  required
                  aria-invalid={errors.input ? 'true' : 'false'}
                  {...register(input.input, { required: true })}
                />
              </label>
            ))}
          </div>

          <FileUpload
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            setValue={setValue}
            control={control}
            fileType="application/pdf"
          />
          <button className="btn btn-base-300">Sūtīt!</button>
        </form>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

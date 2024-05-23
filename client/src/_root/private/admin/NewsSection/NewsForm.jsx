import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const NewsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    axios
      .post('http://localhost:5000/api/vacancies/create', data)
      .catch((err) => {
        if (err.response.status === 400) {
          setError(!error);
          return;
        }
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
        navigate('/admin/dashboard');
      });
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Izveidot jaunu rakstu</h1>
      <div className="mx-auto max-w-full px-6 lg:px-8 border-t border-gray-300 w-full mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md px-8 py-10 gap-8 rounded-md flex flex-col bg-mainBg w-[90%] md:w-[80%] lg:w-2/3 m-auto mt-8"
        >
          {/* ERROR HANDLING!!!! */}
          {(errors.title && errors.title.type === 'required') ||
          (errors.address && errors.address.type === 'required') ||
          (errors.description && errors.description.type === 'required') ||
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
                Lūdzu aizpildiet visus obligātos laukus
              </span>
            </div>
          ) : null}
          <label className="form-control w-full  m-auto">
            <div className="label">
              <span className="label-text">Virsraksts</span>
            </div>
            <input
              id="title"
              type="text"
              className="input input-bordered w-full bg-white"
              required
              aria-invalid={errors.title ? 'true' : 'false'}
              {...register('title', { required: true })}
            />
          </label>
          <label className="form-control w-full m-auto">
            <div className="label">
              <span className="label-text">Saturs</span>
            </div>
            <textarea
              id="description"
              className="textarea textarea-bordered h-36 resize-none w-full bg-white"
              placeholder="Saturs"
              required
              aria-invalid={errors.description ? 'true' : 'false'}
              {...register('description', { required: true })}
            ></textarea>
          </label>
          <label className="form-control w-auto m-auto">
            <div className="label">
              <span className="label-text">Attēls</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs file-input-base-100 bg-white"
            />
          </label>
          <button
            type="submit"
            className="btn btn-base-300 w-1/2 max-w-sm  mx-auto"
          >
            Izveidot
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsForm;

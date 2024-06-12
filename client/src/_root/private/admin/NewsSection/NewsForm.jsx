import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

const NewsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    axios
      .post('/api/news/create', data)
      .catch((err) => {
        if (err.response.status === 400) {
          setError('Lūdzu, aizpildiet visus obligātos laukus!');
          return;
        }
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
          return;
        }
        setError('Kļūda: ' + err.response.status + ' - ' + err.response.statusText);
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
        setSuccess('Ziņu raksts veiksmīgi izveidots!');
        setTimeout(() => {
          navigate('/admin');
          setIsSubmitting(false);
        }, 2000);
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
          {/* SUCCESS MESSAGE */}
          {success && (
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
          )}
          {/* ERROR HANDLING */}
          {error && (
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
          )}
          <label className="form-control w-full m-auto">
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
              {...register('urlToImage')}
            />
          </label>
          <button
            type="submit"
            className="btn btn-base-300 w-1/2 max-w-sm  mx-auto"
            disabled={isSubmitting}
          >
            Izveidot
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsForm;

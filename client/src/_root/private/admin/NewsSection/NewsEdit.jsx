import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import FileUpload from '../../../../components/FileUpload';

const NewsEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);

  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const { setUser } = useContext(AuthContext);

  const fetchNews = useCallback(async () => {
    try {
      const res = await axios.get(`/api/news/${id}`);
      if (res.status === 200) {
        const data = res.data;
        setValue('title', data.title);
        setValue('content', data.content);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        setUser({ isLoggedIn: false });
        navigate('/');
      }
    }
  }, [id, navigate, setUser, setValue]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (data.file) {
      const formData = new FormData();
      formData.append('file', data.file);
      const { file, ...otherData } = data;

      const res = await axios
        .post('/api/files/upload/image', formData)
        .catch((err) => {
          console.log(err);
        });

        otherData.imgId = res.data;

        try {
          const res = await axios.put(`/api/news/${id}`, otherData);
          if (res.status === 200) {
            setSuccess('Ziņu raksts veiksmīgi atjaunināts!');
            setTimeout(() => {
              navigate('/admin/news');
              setIsSubmitting(false);
            }, 2000);
          }
        } catch (err) {
          if (err.response.status === 400) {
            setError(!error);
          } else if (err.response.status === 401) {
            setUser({ isLoggedIn: false });
            navigate('/');
          } else {
            setError(!error);
          }
        }

    }

    try {
      const res = await axios.put(`/api/news/${id}`, data);
      if (res.status === 200) {
        setSuccess('Ziņu raksts veiksmīgi atjaunināts!');
        setTimeout(() => {
          navigate('/admin/news');
          setIsSubmitting(false);
        }, 2000);
      }
    } catch (err) {
      if (err.response.status === 400) {
        setError(!error);
      } else if (err.response.status === 401) {
        setUser({ isLoggedIn: false });
        navigate('/');
      } else {
        setError(!error);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Rediģēt ziņu rakstu</h1>
      <div className="">
        <div className="mx-auto border-t border-gray-300 w-full mt-8"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-md px-8 py-10 gap-8 flex flex-col w-[90%] md:w-[80%] lg:w-2/3 m-auto mb-8 mt-8"
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
          ) : null}
          {(errors.title && errors.title.type === 'required') ||
          (errors.content && errors.content.type === 'required') ||
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
              id="content"
              className="textarea textarea-bordered h-36 resize-none w-full bg-white"
              required
              aria-invalid={errors.content ? 'true' : 'false'}
              {...register('content', { required: true })}
            ></textarea>
          </label>
          <FileUpload
            control={control}
            setValue={setValue}
            fileType={'image/png'}
          />
          <button
            type="submit"
            className="btn btn-base-300 w-1/2 max-w-sm  mx-auto"
          >
            Saglabāt
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsEdit;

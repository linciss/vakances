import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

const VacancyEdit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(false);

  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const { setUser } = useContext(AuthContext);

  const fetchVacancy = async () => {
    axios
      .get(`http://localhost:5000/api/vacancies/${id}`)
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
          return;
        }
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
        setValue('title', data.title);
        setValue('load', data.load);
        setValue('workTime', data.workTime);
        setValue('address', data.address);
        setValue('salary', data.salary);
        setValue('experience', data.experience);
        setValue('workType', data.workType);
        setValue('description', data.description);
      });
  };

  useEffect(() => {
    fetchVacancy();
  }, [id]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    axios
      .put(`http://localhost:5000/api/vacancies/admin/${id}`, data)
      .catch((err) => {
        if (err.response.status === 400) {
          setError(!error);
          return;
        } else if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
          return;
        }
        setError(!error);
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
        setSuccess('Vakance rediģēta veiksmīgi!');
        setTimeout(() => {
          navigate('/admin');
          setIsSubmitting(false);
        }, 2000);
      });
  };

  return (
    <>
      <h1 className="text-4xl font-bold">Izveidot jaunu vakanci</h1>
      <div className="">
        <div className="mx-auto border-t border-gray-300 w-full mt-8"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" shadow-md  px-8 py-10 gap-8  flex flex-col w-[90%] md:w-[80%] lg:w-2/3 m-auto mb-8 mt-8"
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
              <span className="label-text">Vakances nosaukums</span>
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
          <div className="gap-8 grid grid-cols-1 xl:grid-cols-2">
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Slodze</span>
              </div>
              <select
                className="select select-bordered bg-white"
                {...register('load')}
              >
                <option defaultValue={'Pilna slodze'}>Pilna slodze</option>
                <option>Pusslodze</option>
                <option>Trešdaļas slodze</option>
              </select>
            </label>
            <label className="form-control w-full max-w-sm m-auto ">
              <div className="label">
                <span className="label-text">Darba laiks</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-sm bg-white"
                {...register('workTime')}
              />
            </label>
            <label className="form-control w-full max-w-sm m-auto">
              <div className="label">
                <span className="label-text">Atrašanās vieta</span>
              </div>
              <input
                id="address"
                type="text"
                className="input input-bordered w-full max-w-sm bg-white"
                required
                aria-invalid={errors.address ? 'true' : 'false'}
                {...register('address', { required: true })}
              />
            </label>
            <label className="form-control w-full max-w-sm m-auto">
              <div className="label">
                <span className="label-text">Algas apmērs</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-sm bg-white"
                {...register('salary')}
              />
            </label>
            <label className="form-control w-full max-w-sm m-auto">
              <div className="label">
                <span className="label-text">Vajadzīgā pieredze</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-sm bg-white"
                {...register('experience')}
              />
            </label>
            <label className="form-control w-full max-w-sm">
              <div className="label">
                <span className="label-text">Darba veids</span>
              </div>
              <select
                className="select select-bordered bg-white"
                {...register('workType')}
              >
                <option defaultValue={'Klātienē'}>Klātienē</option>
                <option>Attālināti</option>
              </select>
            </label>
          </div>

          <label className="form-control w-full m-auto">
            <div className="label">
              <span className="label-text">Apraksts</span>
            </div>
            <textarea
              id="description"
              className="textarea textarea-bordered h-36 resize-none w-full bg-white"
              placeholder="Apraksts"
              required
              aria-invalid={errors.description ? 'true' : 'false'}
              {...register('description', { required: true })}
            ></textarea>
          </label>
          <button
            type="submit"
            className="btn btn-base-300 w-1/2 max-w-sm  mx-auto "
          >
            Saglabāt
          </button>
        </form>
      </div>
    </>
  );
};

export default VacancyEdit;

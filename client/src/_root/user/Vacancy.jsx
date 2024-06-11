import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VacancyDetails } from '../../components/VacancyDetails';
import FileUpload from '../../components/FileUpload';

const inputDetail = [
  {
    label: 'Vārds',
    input: 'name',
    type: 'text',
  },
  {
    label: 'Uzvārds',
    input: 'surname',
    type: 'text',
  },
  {
    label: 'E-pasts',
    input: 'email',
    type: 'email',
  },
  {
    label: 'Tālrunis',
    input: 'phone',
    type: 'number',
  },
];

const Vacancy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const [vacancy, setVacancy] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/vacancies/${id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || res.status !== 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        setVacancy(data);
      });
  }, [id]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    data.vacancyId = id;
    await axios
      .post('/api/applications/submit', data)
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .then((res) => {
        if (res.status !== 200 || !res) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setSuccess('Aplikācija veiksmīgi aizsūtīta!');
        setTimeout(() => {
          navigate('/vacancies');
          setIsSubmitting(false);
        }, 2000);
      });
  };

  return vacancy ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {vacancy.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{vacancy.description}</p>
        </div>
        <VacancyDetails vacancy={vacancy} />
        <div className="flex justify-center items-center">
          <button
            className="btn btn-base-300 px-16 mt-16"
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Pieteikties!
          </button>
          <dialog id="my_modal_1" className="modal  w-full  max-w-2xl mx-auto">
            <div className="modal-box  mx-auto  w-full max-w-full ">
              <h3 className="font-bold text-lg">Piesakies vakancei</h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-2 gap-8 rounded-md  flex flex-col w-full"
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

                <FileUpload />
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
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/vacancies" />
  );
};

export default Vacancy;

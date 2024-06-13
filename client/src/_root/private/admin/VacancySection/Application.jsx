import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ApplicationData } from '../../../../components/ApplicationData';
import { AuthContext } from '../../../../context/AuthContext';
import { useForm } from 'react-hook-form';

const Application = () => {
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.lastIndexOf('/') + 1);
  const [application, setApplication] = useState({});
  const [cv, setCv] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchApplication = async () => {
    await axios
      .get(`/api/applications/${id}`, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          setUser({ isLoggedIn: false });
          navigate('/');
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
        setApplication(data.application);
        setValue('status', data.application.status);
        setCv(data.file);
      });
  };

  const downloadCV = async () => {
    await axios
      .get(`/api/files/download/${cv._id}`, {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${cv.filename}`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    await axios
      .put(`/api/applications/status/${id}`, data, { withCredentials: true })
      .catch((err) => {
        console.log(err);
        setError(err.response.data);
      })
      .then((res) => {
        if (res.status === 200) {
          fetchApplication();
        }
        return res.data;
      })
      .then((data) => {
        if (!data) {
          return;
        }
        setSuccess(data);
        setTimeout(() => {
          setIsSubmitting(false);
          setSuccess(null);
        }, 2000);
      });
  };

  const date = new Date(application.timeCreated).toLocaleString('en-LV', {
    hour12: false,
  });
  const fullName = application.name + ' ' + application.surname;

  const applicationData = [
    {
      field: 'Pilnais vārds',
      data: fullName,
    },
    {
      field: 'Pieteikums uz vakanci',
      data: application.vacancyName,
    },
    {
      field: 'E-pasts',
      data: application.email,
    },
    {
      field: 'Telefons',
      data: application.phone,
    },
  ];

  const sizeInMb = cv.size / (1024 * 1024);

  return (
    <div className="">
      <h1 className="sm:text-4xl text-xl font-bold">Pieteikums Nr. {id}</h1>
      <h2>
        Pieteikums izveidots {date.slice(0, 10)} {date.slice(11, 20)}{' '}
      </h2>
      <Link
        to={`/vacancies/${application.vacancyId}`}
        className="font-bold"
        target="_blank"
      >
        Aiziet uz vakanci
      </Link>
      <div className="mx-auto border-t border-gray-300 w-full mt-8 px-8"></div>
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {applicationData.map((application, index) => (
              <ApplicationData
                key={index + 1}
                field={application.field}
                data={application.data}
              />
            ))}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Statuss
              </dt>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-row gap-4"
              >
                <select
                  className="select select-bordered w-full max-w-xs"
                  {...register('status')}
                >
                  <option value="0" disabled selected>
                    Iesniegts
                  </option>
                  <option value="1">Apstiprināts</option>
                  <option value="2">Noraidīts</option>
                </select>
                <button className="btn btn-outline btn-info">
                  Mainīt statusu
                </button>
              </form>
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
              {/* ERROR HANDLING!!!! */}
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
                  <span className="text-white">{error}</span>
                </div>
              ) : null}
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                CV
              </dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <ul
                  role="list"
                  className="divide-y divide-gray-100 rounded-md border border-gray-200"
                >
                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                        <span className="truncate font-medium">
                          {cv.filename}
                        </span>
                        <span className="flex-shrink-0 text-gray-400">
                          {sizeInMb.toPrecision(2)} MB
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => downloadCV()}
                      >
                        Lejupielādēt
                      </a>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Application;

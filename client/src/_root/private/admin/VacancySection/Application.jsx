import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ApplicationData } from '../../../../components/ApplicationData';
import { AuthContext } from '../../../../context/AuthContext';

const Application = () => {
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.lastIndexOf('/') + 1);
  const [application, setApplication] = useState({});
  const [cv, setCv] = useState({});

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

  console.log(cv);
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
                        <span className="truncate font-medium">CV</span>
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
                        Download
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

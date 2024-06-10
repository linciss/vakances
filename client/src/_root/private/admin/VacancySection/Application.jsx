import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ApplicationData } from '../../../../components/ApplicationData';

const Application = () => {
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.lastIndexOf('/') + 1);
  const [application, setApplication] = useState({});

  const fetchApplication = async () => {
    await axios
      .get(`/api/applications/${id}`, { withCredentials: true })
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
        if (!data) {
          return;
        }
        setApplication(data);
      });
  };

  useEffect(() => {
    fetchApplication();
  }, []);
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
      field: 'Izglītība',
      data: application.education,
    },
    {
      field: 'Skola',
      data: application.school,
    },
    {
      field: 'Iepriekšējā pieredze',
      data: application.experience,
    },
    {
      field: 'Adrese',
      data: application.address,
    },
  ];

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
                          2.4mb
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
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

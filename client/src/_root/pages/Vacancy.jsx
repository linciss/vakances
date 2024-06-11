import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { LocationSVG } from '../../assets/LocationIcon';
import { MoneySVG } from '../../assets/Money';
import { LoadSVG } from '../../assets/Load';
import { TimeSVG } from '../../assets/Time';
import { ExperienceSVG } from '../../assets/Experience';
import { TypeSVG } from '../../assets/Type';
import { useForm } from 'react-hook-form';

const inputDetail = [
  {
    label: 'Vārds',
  },
  {
    label: 'Uzvārds',
  },
  {
    label: 'E-pasts',
  },
  {
    label: 'Izglītība',
  },
  {
    label: 'Skola',
  },
  {
    label: 'Iepriekšējā pieredze',
  },
  {
    label: 'Adrese',
  },
];

// eslint-disable-next-line react/prop-types
const VacancyDetail = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-4 border-b last:border-0">
    <div className="mr-4">
      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100">
        <Icon className="h-6 w-6 text-gray-600" />
      </div>
    </div>
    <div>
      <dt className="text-sm font-medium text-gray-900">{label}</dt>
      <dd className="mt-1 text-sm text-gray-700">{value}</dd>
    </div>
  </div>
);

const Vacancy = () => {
  const {
    register,
    // eslint-disable-next-line no-unused-vars
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
  const [vacancy, setVacancy] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/vacancies/${id}`)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        if (!res || !res.status === 200) {
          return;
        }
        return res.data;
      })
      .then((data) => {
        setVacancy(data);
      });
  }, [id]);

  return vacancy ? (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            {vacancy.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{vacancy.description}</p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VacancyDetail
            icon={ExperienceSVG}
            label="Darba pieredze:"
            value={vacancy.experience}
          />
          <VacancyDetail
            icon={TimeSVG}
            label="Darba laiks:"
            value={vacancy.workTime}
          />
          <VacancyDetail
            icon={TypeSVG}
            label="Darba veids:"
            value={vacancy.workType}
          />
          <VacancyDetail
            icon={MoneySVG}
            label="Alga (bruto):"
            value={`${vacancy.salary} €`}
          />
          <VacancyDetail
            icon={LocationSVG}
            label="Adrese:"
            value={vacancy.address}
          />
          <VacancyDetail
            icon={LoadSVG}
            label="Darba slodze:"
            value={vacancy.load}
          />
        </dl>
        <div className="flex justify-center items-center">
          <button
            className="btn btn-base-300 px-16 mt-16"
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            Pieteikties!
          </button>
          <dialog
            id="my_modal_1"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Piesakies vakancei</h3>
              <form className=" px-2 gap-8 rounded-md flex flex-col  w-full  m-auto ">
                {inputDetail.map((input, i) => (
                  <label key={i} className="form-control w-full  m-auto">
                    <div className="label">
                      <span className="label-text">{input.label}</span>
                    </div>
                    <input
                      id={input.label}
                      type="text"
                      className="input input-bordered w-full bg-white"
                      required
                      aria-invalid={errors.input ? 'true' : 'false'}
                      {...register(input.label, { required: true })}
                    />
                  </label>
                ))}
                <button className="btn btn-base-300">Sūtīt!</button>
              </form>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Iziet</button>
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

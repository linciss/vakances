import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { LocationSVG } from '../../assets/LocationIcon';
import { MoneySVG } from '../../assets/Money';
import { LoadSVG } from '../../assets/Load';
import { TimeSVG } from '../../assets/Time';
import { ExperienceSVG } from '../../assets/Experience';
import { TypeSVG } from '../../assets/Type';

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
  const { id } = useParams();
  const [vacancy, setVacancy] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const response = await axios.get(`/api/vacancies/${id}`);
        if (response.status === 200) {
          setVacancy(response.data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    };

    fetchVacancy();
  }, [id]);

  if (error) return <Navigate to="/vacancies" />;
  if (!vacancy) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">{vacancy.title}</h1>
          <p className="mt-4 text-lg text-gray-600">{vacancy.description}</p>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VacancyDetail icon={ExperienceSVG} label="Darba pieredze:" value={vacancy.experience} />
          <VacancyDetail icon={TimeSVG} label="Darba laiks:" value={vacancy.workTime} />
          <VacancyDetail icon={TypeSVG} label="Darba veids:" value={vacancy.workType} />
          <VacancyDetail icon={MoneySVG} label="Alga (bruto):" value={`${vacancy.salary} €`} />
          <VacancyDetail icon={LocationSVG} label="Adrese:" value={vacancy.address} />
          <VacancyDetail icon={LoadSVG} label="Darba slodze:" value={vacancy.load} />
        </dl>
      </div>
    </div>
  );
};

export default Vacancy;

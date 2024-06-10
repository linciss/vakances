/* eslint-disable react/prop-types */
import React from 'react';
import { ExperienceSVG } from '../assets/Experience';
import { TimeSVG } from '../assets/Time';
import { TypeSVG } from '../assets/Type';
import { MoneySVG } from '../assets/Money';
import { LocationSVG } from '../assets/LocationIcon';
import { LoadSVG } from '../assets/Load';

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

export const VacancyDetails = ({ vacancy }) => {
  return (
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
  );
};

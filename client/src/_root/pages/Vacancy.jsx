import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { LocationSVG } from '../../assets/LocationIcon';
import { MoneySVG } from '../../assets/Money';
import { LoadSVG } from '../../assets/Load';
import { TimeSVG } from '../../assets/Time';
import { ExperienceSVG } from '../../assets/Experience';
import { TypeSVG } from '../../assets/Type';

export const Vacancy = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState({});

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

  return (
    <div className="container max-w-[1280px]">
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-3xl font-bold tracking-tight  sm:text-4xl">
              {vacancy.title}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral ">
                    <ExperienceSVG />
                  </div>
                  Darba pieredze:
                </dt>
                <dd className=" text-base leading-7 text-gray-600">
                  {vacancy.experience}
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral">
                    <TimeSVG />
                  </div>
                  Darba laiks:
                </dt>
                <dd className=" text-base leading-7 text-gray-600">
                  {vacancy.workTime}
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral">
                    <TypeSVG />
                  </div>
                  Darba veids:
                </dt>
                <dd className=" text-base leading-7 text-gray-600">
                  {vacancy.workType}
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral">
                    <MoneySVG className="w-2 h-2" />
                  </div>
                  Alga (bruto):
                </dt>
                <dd className=" text-base leading-7 text-gray-600">
                  {vacancy.salary} €
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral">
                    <LocationSVG />
                  </div>
                  Adrese:
                </dt>
                <dd className=" text-base leading-7 text-gray-600">
                  {vacancy.address}
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral">
                    <LoadSVG />
                  </div>
                  Darba slodze:
                </dt>
                <dd className="text-base leading-7 text-gray-600">
                  {vacancy.load}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-5xl lg:text-center mt-10">
            <p className="mt-6 text-lg leading-8 ">{vacancy.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

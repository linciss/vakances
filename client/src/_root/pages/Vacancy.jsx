import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
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

  return vacancy ? (
    <div className="container max-w-[1280px]">
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <p className="text-3xl font-bold tracking-tight  sm:text-4xl">
              {vacancy.title}
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl gap-x-8">
            <div className="mx-auto max-w-5xl lg:text-center ">
              <p className="text-lg leading-8 ">{vacancy.description}</p>
            </div>
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
        <div></div>
      </div>
    </div>
  ) : (
    <Navigate to="/vacancies" />
  );

  // return (
  //   <div className="container max-w-[1280px]">
  //     <div className="px-4 sm:px-0 ">
  //       <h3 className="text-base font-semibold leading-7 text-gray-900">
  //         Applicant Information
  //       </h3>
  //       <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
  //         Personal details and application.
  //       </p>
  //     </div>
  //     <div className="mt-6 border-t border-gray-100">
  //       <dl className="divide-y divide-gray-100">
  //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  //           <dt className="text-sm font-medium leading-6 text-gray-900">
  //             Full name
  //           </dt>
  //           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
  //             Margot Foster
  //           </dd>
  //         </div>
  //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  //           <dt className="text-sm font-medium leading-6 text-gray-900">
  //             Application for
  //           </dt>
  //           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
  //             Backend Developer
  //           </dd>
  //         </div>
  //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  //           <dt className="text-sm font-medium leading-6 text-gray-900">
  //             Email address
  //           </dt>
  //           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
  //             margotfoster@example.com
  //           </dd>
  //         </div>
  //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  //           <dt className="text-sm font-medium leading-6 text-gray-900">
  //             Salary expectation
  //           </dt>
  //           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
  //             $120,000
  //           </dd>
  //         </div>
  //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  //           <dt className="text-sm font-medium leading-6 text-gray-900">
  //             About
  //           </dt>
  //           <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
  //             Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
  //             incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
  //             consequat sint. Sit id mollit nulla mollit nostrud in ea officia
  //             proident. Irure nostrud pariatur mollit ad adipisicing
  //             reprehenderit deserunt qui eu.
  //           </dd>
  //         </div>
  //         <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
  //           <dt className="text-sm font-medium leading-6 text-gray-900">
  //             Attachments
  //           </dt>
  //           <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
  //             <ul
  //               role="list"
  //               className="divide-y divide-gray-100 rounded-md border border-gray-200"
  //             >
  //               <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
  //                 <div className="flex w-0 flex-1 items-center">
  //                   <div className="ml-4 flex min-w-0 flex-1 gap-2">
  //                     <span className="truncate font-medium">
  //                       resume_back_end_developer.pdf
  //                     </span>
  //                     <span className="flex-shrink-0 text-gray-400">2.4mb</span>
  //                   </div>
  //                 </div>
  //                 <div className="ml-4 flex-shrink-0">
  //                   <a
  //                     href="#"
  //                     className="font-medium text-indigo-600 hover:text-indigo-500"
  //                   >
  //                     Download
  //                   </a>
  //                 </div>
  //               </li>
  //               <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
  //                 <div className="flex w-0 flex-1 items-center">
  //                   <div className="ml-4 flex min-w-0 flex-1 gap-2">
  //                     <span className="truncate font-medium">
  //                       coverletter_back_end_developer.pdf
  //                     </span>
  //                     <span className="flex-shrink-0 text-gray-400">4.5mb</span>
  //                   </div>
  //                 </div>
  //                 <div className="ml-4 flex-shrink-0">
  //                   <a
  //                     href="#"
  //                     className="font-medium text-indigo-600 hover:text-indigo-500"
  //                   >
  //                     Download
  //                   </a>
  //                 </div>
  //               </li>
  //             </ul>
  //           </dd>
  //         </div>
  //       </dl>
  //     </div>
  //   </div>
  // );
};

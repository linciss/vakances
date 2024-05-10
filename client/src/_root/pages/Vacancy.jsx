import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
      <div>{vacancy.title}</div>
      <div>{vacancy.description}</div>
      <div>{vacancy.address}</div>
      <div>{vacancy.salary}</div>
      <div>{vacancy.experience}</div>
      <div>{vacancy.workTime}</div>
      <div>{vacancy.workType}</div>
      <div>{vacancy.load}</div>
    </div>
  );
};

import React, { useContext, useEffect, useState } from 'react';
import axios from '../../utils/axiosConfig';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VacancyDetails } from '../../components/VacancyDetails';

import { VacancyModal } from '../../components/VacancyModal';
import { AuthContext } from '../../context/AuthContext';

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
    setValue,
    formState: { errors },
    control,
  } = useForm();

  const { id } = useParams();
  const [vacancy, setVacancy] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`/vacancies/${id}`, { withCredentials: true })
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

  const handleFile = (file) => {
    console.log(file);
    if (file.type !== 'application/pdf') {
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('file', data.file);
    const { file, ...otherData } = data;

    const res = await axios
      .post('/files/upload', formData, { withCredentials: true })
      .catch((err) => {
        console.log(err);
      });
    otherData.vacancyId = id;
    otherData.cvId = res.data;
    await axios
      .post('/applications/submit', otherData, { withCredentials: true })
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
        {!user.isLoggedIn && (
          <div className="flex justify-center items-center">
            <button
              className="btn btn-base-300 px-16 mt-16"
              onClick={() => document.getElementById('my_modal_1').showModal()}
            >
              Pieteikties!
            </button>
            <VacancyModal
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              success={success}
              error={error}
              inputDetail={inputDetail}
              errors={errors}
              register={register}
              setValue={setValue}
              control={control}
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Navigate to="/vacancies" />
  );
};

export default Vacancy;

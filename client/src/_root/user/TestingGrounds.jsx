import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const TestingGrounds = () => {
  const [fileName, setFileName] = useState('');
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('file', data.file);
    await axios
      .post('http://localhost:5000/api/files/upload', formData)
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('asdasdsad');

    if (file.type !== 'application/pdf') {
      setError('Lūdzu ievietot tikai PDF failu!');
      return;
    }
    if (file) {
      setFileName(file.name);
      setError('');
    }
  };

  const getFiles = async () => {
    await axios
      .get(`http://localhost:5000/api/files/download`, {
        responseType: 'blob',
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filename');
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-2 gap-8 rounded-md  flex flex-col w-full"
        encType="multipart/form-data"
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-base-300 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 d"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Spied, lai augšupielādētu</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF</p>
          </div>
          {/* <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={handleFileUpload}
        
        {...register('file', { required: true })}
      /> */}
          <Controller
            control={control}
            name="file"
            defaultValue={null}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  handleFileUpload(e);
                  field.onChange(e.target.files[0]);
                }}
                accept="application/pdf"
              />
            )}
          />
        </label>
        {error && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Kļūda: <span className="font-semibold">{error}</span>
          </p>
        )}
        {fileName && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-row gap-2 mx-auto">
            Augšupielādētais fails:{' '}
            <span className="font-semibold">{fileName}</span>
            {/* <span
          onClick={() => {
            handleRemove();
          }}
          className=" ml-4 cursor-pointer"
        >
          ✕
        </span> */}
          </p>
        )}
        <button type="submit">sss</button>
      </form>
      <div onClick={() => getFiles()}>asdasddsadsadsad</div>
    </>
  );
};

export default TestingGrounds;

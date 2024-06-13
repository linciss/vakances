import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

const FileUpload = ({ setValue, control, fileType }) => {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log('asdasdsad');

    if (file.type !== fileType) {
      setError('Nav pareizs faila formāts!');
      return;
    }
    if (file) {
      setFileName(file.name);
      setError('');
    }
  };

  const handleRemove = () => {
    setFileName('');
    setValue('file', null);
  };

  return (
    <>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-base-300 hover:bg-base-100 "
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
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {fileType === 'application/pdf' ? 'PDF' : 'PNG'}
          </p>
        </div>
        <Controller
          control={control}
          name="file"
          defaultValue={null}
          rules={{ required: fileType === 'application/pdf' ? true : false }}
          render={({ field }) => (
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => {
                handleFileUpload(e);
                field.onChange(e.target.files[0]);
              }}
              accept={fileType}
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
          <span
            onClick={() => {
              handleRemove();
            }}
            className=" ml-4 cursor-pointer"
          >
            ✕
          </span>
        </p>
      )}
    </>
  );
};

export default FileUpload;

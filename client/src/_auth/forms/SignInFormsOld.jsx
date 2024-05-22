// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { AuthContext } from '../../context/AuthContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const SignInForms = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm();

//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { setUser } = useContext(AuthContext);
//   const [error, setError] = useState(null);

//   const onSubmit = async (data) => {
//     if (isSubmitting) return;
//     setIsSubmitting(true);
//     await axios
//       .post('/api/auth/login', data)
//       .catch((err) => {
//         if (err.response.status === 401) {
//           setError(err.response.data);
//           return;
//         } else if (err.response.status === 429) {
//           setError('Pārāk daudz pieprasījumu! Lūdzu mēģiniet vēlāk!');
//           return;
//         }
//         setError('Minimālais simbolu skaits nav sasniegts!');
//         console.log(err);
//       })
//       .then((res) => {
//         if (!res || !res.statusText === 'OK' || res.status >= 400) {
//           return;
//         }
//         return res.data;
//       })
//       .then((data) => {
//         if (!data) {
//           return;
//         }
//         setUser(data);
//         navigate('/');
//       });
//     setTimeout(() => {
//       setIsSubmitting(false);
//     }, 2000);
//     if (error || errors) {
//       setValue('password', '');
//     }
//   };

//   return (
//     <div className="m-auto md:w-3/4 lg:w-1/2 mt-10">
//       <div className="m-auto">
//         <h1 className=" text-5xl md:text-7xl font-bold text-center">
//           Pieslēdzies
//         </h1>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="shadow-xl px-8 py-10 bg-mainGreen flex gap-8 flex-col mt-10 rounded-md"
//       >
//         {error ? (
//           <div
//             role="alert"
//             className="bg-red-500 p-4 text-white text-3xl rounded-md text-center transition-all duration-200 animate-fadeIn"
//           >
//             {error}
//           </div>
//         ) : null}
//         <div>
//           <label
//             htmlFor="username"
//             className={`text-white text-lg font-semibold`}
//           >
//             Lietotājvārds
//           </label>
//           {errors.username && errors.username.type === 'minLength' ? (
//             <div role="alert" className="text-red-500 text-xs">
//               Minimālo simbolu skaits ir 3!
//             </div>
//           ) : null}
//           <input
//             id="username"
//             aria-invalid={errors.username || error ? 'true' : 'false'}
//             maxLength={30}
//             className={`block ${
//               errors.username ? 'border-red-700' : 'border-[#ACE6BB]'
//             } w-full p-4 my-2 bg-secondaryGreen focus:outline-none text-white border  rounded-md`}
//             {...register('username', {
//               required: true,
//               maxLength: 20,
//               minLength: 3,
//             })}
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="username"
//             className={`text-white text-lg font-semibold`}
//           >
//             Parole
//           </label>
//           {errors.password && errors.password.type === 'minLength' ? (
//             <div className="text-red-500 text-xs">
//               Miniālais simbolu skaits ir 6!
//             </div>
//           ) : null}
//           <input
//             id="password"
//             type="password"
//             aria-invalid={errors.password || error ? 'true' : 'false'}
//             className={`border  ${
//               errors.password ? 'border-red-700' : 'border-[#ACE6BB]'
//             } block w-full p-4 my-2 bg-secondaryGreen text-white outline-none  rounded-md`}
//             {...register('password', {
//               required: true,
//               maxLength: 20,
//               minLength: 6,
//             })}
//           />
//         </div>

//         <button
//           type="submit"
//           className=" text-white font-bold py-4 rounded-md bg-secondaryGreen transition-all duration-200 hover:animate-pulse"
//         >
//           Pieslēgties
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignInForms;

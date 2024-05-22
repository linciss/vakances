// import React from 'react';
// import { FaMapSigns } from "react-icons/fa";
// import { BsFillTelephoneFill, BsGlobeAmericas } from "react-icons/bs";
// import { FaPaperPlane } from "react-icons/fa";

// // const Contact = () => {
// //   return(
// //     <div className="container max-w-[1280px]">Contact</div>

// //   );
// // };

// // export default Contact;

// const Contact = () => {
//   const contactTab = [
//     {
//       icon: <FaMapSigns className="text-4xl" />,
//       title: "Adrese",
//       desription: `Ventspils iela 51, Liepāja, LV-3405`,
//     },
//     {
//       icon: <BsFillTelephoneFill className="text-4xl" />,
//       title: "Telefons",
//       desription: `+371 26838811`,
//     },
//     {
//       icon: <FaPaperPlane className="text-4xl" />,
//       title: "E-pasts",
//       desription: `itIr@speks.lv`,
//     },
//     {
//       icon: <BsGlobeAmericas className="text-4xl" />,
//       title: "Mājaslapa",
//       desription: "itirspeks.com",
//     },
//   ];
//   return (
//     <>
//       <div>
//         {" "}
//         <div className="md:w-96 mx-auto text-center my-24">
//           <div className="text-2xl font-bold">Sazinieties ar mums</div>
//           <div className="text-xl">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit.
//             Perspiciatis dolorem sint, magni magnam impedit dignissimos rerum
//             modi error ex libero corrupti ab, numquam, eius maxime! Soluta quos
//             culpa possimus tempora.
//           </div>
//         </div>
//         {/* Cards */}
//         <div className="container mx-auto my-12 h-auto">
//           <div className="flex gap-5 justify-center flex-wrap h-auto lg:flex-nowrap ">
//             {contactTab.map((x, index) => {
//               return (
//                 <div key={index} className="card w-full  shadow-xl h-auto ">
//                   <div className="card-body items-center flex-grow-0  text-center">
//                     <h2 className="card-title">{x.icon}</h2>
//                     <p className="text-lg font-bold my-3">{x.title}</p>
//                     <div className="">
//                       <p className=" text-lg font-semibold">{x.desription}</p>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <div className=" container mx-auto  flex flex-wrap shadow-2xl my-20 rounded-md p-5">
//         <div className="lg:w-1/2 w-full p-4">
//           <form className="  shadow-md rounded-lg px-2 pt-6 pb-8 mb-4">
//             <div className="flex  flex-col">
//                   <div className="mx-auto form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Tavs vārds un uzvārds</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Vārds, uzvārds"
//                       className="input input-bordered w-full  "
//                     />
//                   </div>

//                   <div className="mx-auto form-control w-full">
//                     <label className="label">
//                       <span className="label-text">Telefons</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Telefons"
//                       className="input input-bordered w-full  "
//                     />
//                   </div>

//                   <div className="mx-auto form-control w-full">
//                     <label className="label">
//                       <span className="label-text">E-pasts</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="E-pasts"
//                       className="input input-bordered w-full  "
//                     />
//                   </div>

//                   <label className="form-control w-full m-auto">
//                     <div className="label">
//                       <span className="label-text">Ziņojums</span>
//                     </div>
//                     <textarea
//                       id="description"
//                       className="textarea textarea-bordered h-36 resize-none w-full"
//                       placeholder="Ziņojums"
//                       required
//                     ></textarea>
//                   </label>

//                   <div className="w-full my-4 flex justify-end ">
//                   <button type="submit" className="btn btn-primary w-1/2 max-w-sm  mx-auto">
//                     Nosūtīt
//                   </button>
//                   </div>
//             </div>
//           </form>
//         </div>
//         <div className="lg:w-1/2 w-full   p-4">
//           <div className="relative aspect-w-16 h-[50vw] lg:h-full aspect-h-9">
//             <iframe
//               className="absolute inset-0 w-full h-full"
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2200.070725538116!2d21.02325937091362!3d56.53542654007353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46faa7ccb271be93%3A0xf9d1bf3406ae7d9d!2sLiep%C4%81jas%20Valsts%20tehnikums!5e0!3m2!1slv!2slv!4v1716196231877!5m2!1slv!2slv"
//               allowFullScreen
//               loading="lazy"
//             ></iframe>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Contact;

import React from 'react';
import { FaMapSigns } from 'react-icons/fa';
import { BsFillTelephoneFill, BsGlobeAmericas } from 'react-icons/bs';
import { FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const contactTab = [
    {
      icon: <FaMapSigns className="text-4xl" />,
      title: 'Adrese',
      desription: `Ventspils iela 51, Liepāja, LV-3405`,
    },
    {
      icon: <BsFillTelephoneFill className="text-4xl" />,
      title: 'Telefons',
      desription: `+371 26838811`,
    },
    {
      icon: <FaPaperPlane className="text-4xl" />,
      title: 'E-pasts',
      desription: `itIr@speks.lv`,
    },
    {
      icon: <BsGlobeAmericas className="text-4xl" />,
      title: 'Mājaslapa',
      desription: 'itirspeks.com',
    },
  ];

  return (
    <div className="container max-w-[1280px] pb-1">
      <div className="md:w-96 mx-auto text-center py-12">
        <div className="text-2xl font-bold">Sazinieties ar mums</div>
      </div>
      <div className="container mx-auto my-12 h-auto">
        <div className="flex gap-5 justify-center flex-wrap h-auto lg:flex-nowrap">
          {contactTab.map((detail, index) => (
            <div
              key={index}
              className="card w-full shadow-xl h-auto bg-base-300"
            >
              <div className="card-body items-center flex-grow-0 text-center">
                <h2 className="card-title">{detail.icon}</h2>
                <p className="text-lg font-bold my-3">{detail.title}</p>
                <div>
                  <p className="text-lg font-semibold">{detail.desription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap shadow-xl my-20 rounded-md p-5 bg-base-300">
        <div className="lg:w-1/2 w-full p-4">
          <form className=" rounded-lg px-2 pt-6 pb-8 mb-4">
            <div className="flex flex-col">
              <div className="mx-auto form-control w-full">
                <label className="label">
                  <span className="label-text">Tavs vārds un uzvārds</span>
                </label>
                <input
                  type="text"
                  placeholder="Vārds, uzvārds"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mx-auto form-control w-full">
                <label className="label">
                  <span className="label-text">Telefons</span>
                </label>
                <input
                  type="text"
                  placeholder="Telefons"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mx-auto form-control w-full">
                <label className="label">
                  <span className="label-text">E-pasts</span>
                </label>
                <input
                  type="text"
                  placeholder="E-pasts"
                  className="input input-bordered w-full"
                />
              </div>
              <label className="form-control w-full m-auto">
                <div className="label">
                  <span className="label-text">Ziņojums</span>
                </div>
                <textarea
                  id="description"
                  className="textarea textarea-bordered h-36 resize-none w-full"
                  placeholder="Ziņojums"
                  required
                ></textarea>
              </label>
              <div className="w-full my-4 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary w-1/2 max-w-sm mx-auto"
                >
                  Nosūtīt
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:w-1/2 w-full p-4 rounded-lg">
          <div className="relative aspect-w-16 h-[50vw] lg:h-full aspect-h-9">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2200.070725538116!2d21.02325937091362!3d56.53542654007353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46faa7ccb271be93%3A0xf9d1bf3406ae7d9d!2sLiep%C4%81jas%20Valsts%20tehnikums!5e0!3m2!1slv!2slv!4v1716196231877!5m2!1slv!2slv"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

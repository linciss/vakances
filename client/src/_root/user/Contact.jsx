import React from 'react';

import { PhoneIcon } from '../../assets/PhoneIcon';
import { PaperPlaneIcon } from '../../assets/PaperPlaneIcon';

import { LocationPinIcon } from '../../assets/LocationPinIcon';

const contactTab = [
  {
    icon: <LocationPinIcon className="text-base-300" />,
    title: 'Adrese',
    desription: `Ventspils iela 51, Liepāja, LV-3405`,
  },
  {
    icon: <PhoneIcon className="text-base-300" />,
    title: 'Telefons',
    desription: `+371 26838811`,
  },
  {
    icon: <PaperPlaneIcon className="text-base-300" />,
    title: 'E-pasts',
    desription: `itir@speks.lv`,
  },
];

const Contact = () => {
  return (
    <div className="pb-1 ">
      <div className="w-full text-center py-12  flex flex-col justify-center items-center">
        <div className="text-5xl font-bold">Sazinieties ar mums</div>
        <div className=" grid  my-16 bt-10 bg-base-300 w-full lg:grid-cols-3   grid-cols-1 ">
          {contactTab.map((detail, index) => (
            <div
              key={index}
              className="card w-full h-auto bg-base-300 rounded-none"
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
      <div className=" container max-w-[1280px]  w-full  mx-auto pt-6  my-10 pb-8 p-5">
        <div className="lg:w-4/5 w-full p-4 grid grid-cols-1 md:grid-cols-2  mx-auto">
          <div className="flex flex-col  text-start">
            <h3 className="text-5xl font-bold">Uzraksti mums!</h3>
            <p className="text-lg font-semibold mt-4">
              Ja ir jautājumi, ieteikumi vai vēlaties sazināties ar mums,
              aicinām aizpildīt redzamo formu. Mēs ar Jums sazināsimies pēc
              iespējas ātrāk.
            </p>
          </div>
          <form className=" rounded-lg md:mt-0 mt-8 ">
            <div className="flex flex-col">
              <div className="mx-auto form-control w-full">
                <label className="label">
                  <span className="label-text">Pilnais vārds</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white"
                />
              </div>
              <div className="mx-auto form-control w-full">
                <label className="label">
                  <span className="label-text">Telefons</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white"
                />
              </div>
              <div className="mx-auto form-control w-full">
                <label className="label">
                  <span className="label-text">E-pasts</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white"
                />
              </div>
              <label className="form-control w-full m-auto">
                <div className="label">
                  <span className="label-text">Ziņojums</span>
                </div>
                <textarea
                  id="description"
                  className="textarea textarea-bordered h-36 resize-none w-full bg-white"
                  required
                ></textarea>
              </label>
              <div className="w-full my-4 flex justify-end">
                <button
                  type="submit"
                  className="btn btn-base-300 w-1/2 max-w-sm mx-auto"
                >
                  Nosūtīt
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* <div className="lg:w-1/2 w-full p-4 rounded-lg">
          <div className="relative aspect-w-16 h-[50vw] lg:h-full aspect-h-9">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2200.070725538116!2d21.02325937091362!3d56.53542654007353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46faa7ccb271be93%3A0xf9d1bf3406ae7d9d!2sLiep%C4%81jas%20Valsts%20tehnikums!5e0!3m2!1slv!2slv!4v1716196231877!5m2!1slv!2slv"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Contact;
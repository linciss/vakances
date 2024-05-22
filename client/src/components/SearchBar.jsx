import React from 'react';

export const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 ">
      <input
        type="text"
        placeholder="Meklēt..."
        className="input input-bordered w-full max-w-xs text-black"
      />
      <div className=" btn text-white btn-neutral">Meklēt</div>
    </div>
  );
};

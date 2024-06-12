import React from 'react';

export const MultiSelectDropDown = ({ tags, register }) => {
  return (
    <div className="dropdown  dropdown-hover ">
      <div tabIndex={0} role="button" className="btn w-full">
        Ievieto tagus
      </div>
      <ul
        tabIndex={0}
        className=" grid grid-cols-3 w-full p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box gap-2"
      >
        {tags.map((tag, i) => {
          return (
            <li key={i} className="">
              <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-base-100 [&:has(input:checked)]:bg-base-300">
                <input
                  type="checkbox"
                  value={tag}
                  {...register('tags')}
                  className="checkbox checkbox-primary cursor-pointer"
                />
                <span className="ml-1">{tag}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

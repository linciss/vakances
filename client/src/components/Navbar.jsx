import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <header className="max-h-20 h-20 bg-mainGreen flex items-center ">
      <div className="flex px-10 ">
        <NavLink to="/">
          <h1 className="text-white text-3xl font-bold">IT ir spēks</h1>
        </NavLink>
      </div>
    </header>
  );
};

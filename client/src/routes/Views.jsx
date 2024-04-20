import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../_auth/AuthLayout';
import {
  PasswordForms,
  SignInForms,
  UsernameForms,
} from '../_auth/forms/index';
import { Home, About, Contact, Vacancies, Profile } from '../_root/pages/index';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '../context/AuthContext';

export const Views = () => {
  const { user } = useContext(AuthContext);
  return user.isLoggedIn === null ? null : (
    <Routes>
      {/* PUBLIC ROUTES  */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignInForms />} />
      </Route>
      <Route path="/" exact element={<Home />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* PRIVATE ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/change-password" element={<PasswordForms />} />
        <Route path="/profile/change-username" element={<UsernameForms />} />
      </Route>
    </Routes>
  );
};

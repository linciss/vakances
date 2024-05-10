import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../_auth/AuthLayout';
import {
  PasswordForms,
  SignInForms,
  UsernameForms,
} from '../_auth/forms/index';
import { Home, Contact, Vacancies, Profile, News } from '../_root/pages/index';
import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '../context/AuthContext';
import { AdminPanel } from '../_root/private/AdminPanel';
import { Dashboard } from '../_root/private/admin/Dashboard';
import { Applications } from '../_root/private/admin/Applications';
import { VacancyForm } from '../_root/private/admin/VacancyForm';
import { Vacancy } from '../_root/pages/Vacancy';

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
      <Route path="/vacancies/:id" element={<Vacancy />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />

      {/* PRIVATE ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/change-password" element={<PasswordForms />} />
        <Route path="/profile/change-username" element={<UsernameForms />} />
        <Route element={<AdminPanel />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/new-vacancy" element={<VacancyForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

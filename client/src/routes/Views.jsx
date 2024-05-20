import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../_auth/AuthLayout';
import {
  PasswordForms,
  // eslint-disable-next-line no-unused-vars
  SignInForms,
  UsernameForms,
} from '../_auth/forms/index';
import { Home, Contact, Vacancies, News } from '../_root/pages';
import { Vacancy } from '../_root/pages/Vacancy';

import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '../context/AuthContext';
import {NewSignInForms} from '../_auth/forms/NewSignInForms';
import {
  AdminPanel,
  Applications,
  Dashboard,
  NewsForm,
  NewsView,
  Profile,
  VacancyForm,
  VacancyView,
} from '../_root/private';

export const Views = () => {
  const { user } = useContext(AuthContext);
  return user.isLoggedIn === null ? null : (
    <Routes>
      {/* PUBLIC ROUTES  */}
      <Route element={<AuthLayout />}>
        {/* <Route path="/login" element={<SignInForms />} /> */}
        <Route path="/login" element={<NewSignInForms />} />
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
          <Route path="/admin/vacancies" element={<VacancyView />} />
          <Route path="/admin/news" element={<NewsView />} />
          <Route path="/admin/new-news" element={<NewsForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

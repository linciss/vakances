import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../_auth/AuthLayout';
import {
  PasswordForms,
  SignInForms,
  UsernameForms,
} from '../_auth/forms/index';
import { Home, Contact, Vacancies, News, ViewNews } from '../_root/pages';
import { Vacancy } from '../_root/pages/Vacancy';

import { PrivateRoutes } from './PrivateRoutes';
import { AuthContext } from '../context/AuthContext';

import {
  AdminPanel,
  Applications,
  Dashboard,
  NewsForm,
  NewsView,
  Profile,
  VacancyForm,
  VacancyView,
  Users,
} from '../_root/private';

export const Views = () => {
  const { user } = useContext(AuthContext);
  return user.isLoggedIn === null ? null : (
    <Routes>
      {/* PUBLIC ROUTES  */}
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route element={<AuthLayout />}>
        {/* <Route path="/login" element={<SignInForms />} /> */}
        <Route path="/login" element={<SignInForms />} />
      </Route>
      <Route path="/" exact element={<Home />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/vacancies/:id" element={<Vacancy />} />

      <Route path="/news" element={<News />} />
      <Route path="/viewNews/:id" element={<ViewNews />} />
      <Route path="/contact" element={<Contact />} />

      {/* PRIVATE ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/change-password" element={<PasswordForms />} />
        <Route path="/profile/change-username" element={<UsernameForms />} />
        <Route element={<AdminPanel />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/new-vacancy" element={<VacancyForm />} />
          <Route path="/admin/vacancies" element={<VacancyView />} />
          <Route path="/admin/news" element={<NewsView />} />
          <Route path="/admin/new-news" element={<NewsForm />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

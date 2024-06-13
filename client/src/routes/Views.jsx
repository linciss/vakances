import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../_auth/AuthLayout';
import {
  PasswordForms,
  SignInForms,
  UsernameForms,
} from '../_auth/forms/index';
import {
  Home,
  Contact,
  Vacancies,
  News,
  ViewNews,
  Vacancy,
  NotFound,
} from '../_root/user';

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
  UserForm,
  Application,
  VacancyEdit,
  UserEdit,
  NewsEdit,
} from '../_root/private';

export const Views = () => {
  const { user } = useContext(AuthContext);
  return user.isLoggedIn === null ? null : (
    <Routes>
      {/* PUBLIC ROUTES  */}
      <Route path="*" element={<NotFound />} />
      <Route element={<AuthLayout />}>
        {/* <Route path="/login" element={<SignInForms />} /> */}
        <Route path="/login" element={<SignInForms />} />
      </Route>
      <Route path="/" exact element={<Home />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/vacancies/:id" element={<Vacancy />} />

      <Route path="/news" element={<News />} />
      <Route path="/news/:id" element={<ViewNews />} />
      <Route path="/contact" element={<Contact />} />

      {/* PRIVATE ROUTES */}
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/change-password" element={<PasswordForms />} />
        <Route path="/profile/change-username" element={<UsernameForms />} />
        <Route element={<AdminPanel />}>
          <Route path="/admin" element={<Dashboard />} />
          {/* VACANCIES */}
          <Route path="/admin/applications" element={<Applications />} />
          <Route path="/admin/applications/:id" element={<Application />} />
          {/* APPLICATIONS */}
          {/* VACANCIES */}
          <Route path="/admin/vacancies/new" element={<VacancyForm />} />
          <Route path="/admin/vacancies" element={<VacancyView />} />
          <Route path="/admin/vacancies/:id" element={<VacancyEdit />} />
          {/* VACANCIES */}
          {/* NEWS */}
          <Route path="/admin/news" element={<NewsView />} />
          <Route path="/admin/news/new" element={<NewsForm />} />
          <Route path="/admin/news/:id" element={<NewsEdit />} />
          {/* NEWS */}
          {/* USERS */}
          <Route path="/admin/users/new" element={<UserForm />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/users/:id" element={<UserEdit />} />
          {/* USERS */}
        </Route>
      </Route>
    </Routes>
  );
};

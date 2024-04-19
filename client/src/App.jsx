import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About, Contact, Home, Vacancies, Profile } from './_root/pages/index';
import { AuthLayout } from './_auth/AuthLayout';
import { PasswordForms, SignInForms, UsernameForms } from './_auth/forms/index';
import { ArticlesProvider } from './context/ArticlesContext';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoutes } from './_auth/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <main className="bg-lightGreen/20 min-h-screen">
        <Navbar />
        <div className="m-auto max-w-[1280px] ">
          <ArticlesProvider>
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
                <Route
                  path="/profile/change-password"
                  element={<PasswordForms />}
                />
                <Route
                  path="/profile/change-username"
                  element={<UsernameForms />}
                />
              </Route>
            </Routes>
          </ArticlesProvider>
        </div>
      </main>
    </AuthProvider>
  );
}

export default App;

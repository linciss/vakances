import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { About, Contact, Home, Vacancies } from './_root/pages/index';
import { AuthLayout } from './_auth/AuthLayout';
import { SignInForms } from './_auth/forms/index';
import { ArticlesProvider } from './context/ArticlesContext';

function App() {
  return (
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
          </Routes>
        </ArticlesProvider>
      </div>
    </main>
  );
}

export default App;

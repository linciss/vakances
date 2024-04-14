import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './_root/pages/index';
import { AuthLayout } from './_auth/AuthLayout';
import { SignInForms } from './_auth/forms/index';

function App() {
  return (
    <main>
      <Navbar />
      <div className="m-auto max-w-[1280px]">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<SignInForms />} />
          </Route>

          <Route path="/" exact element={<Home />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;

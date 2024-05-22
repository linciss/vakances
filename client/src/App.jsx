import React from 'react';

import { ArticlesProvider } from './context/ArticlesContext';
import { AuthProvider } from './context/AuthContext';
import { Views } from './routes/Views';
import { Navbar } from './components/Navbar';
import { VacancyProvider } from './context/VacancyContext';
import { Footer } from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <main className="bg-mainBg  min-h-screen">
        <Navbar />
        <div className="m-auto ">
          <ArticlesProvider>
            <VacancyProvider>
              <Views />
            </VacancyProvider>
          </ArticlesProvider>
        </div>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;

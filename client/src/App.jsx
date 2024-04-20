import React from 'react';

import { Navbar } from './components/Navbar';

import { ArticlesProvider } from './context/ArticlesContext';
import { AuthProvider } from './context/AuthContext';
import { Views } from './routes/Views';

function App() {
  return (
    <AuthProvider>
      <main className="bg-lightGreen/20 min-h-screen">
        <Navbar />
        <div className="m-auto max-w-[1280px] ">
          <ArticlesProvider>
            <Views />
          </ArticlesProvider>
        </div>
      </main>
    </AuthProvider>
  );
}

export default App;

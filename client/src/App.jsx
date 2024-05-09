import React from 'react';

import { ArticlesProvider } from './context/ArticlesContext';
import { AuthProvider } from './context/AuthContext';
import { Views } from './routes/Views';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <main className="bg-base-100 min-h-screen">
        <Navbar />
        <div className="m-auto ">
          <ArticlesProvider>
            <Views />
          </ArticlesProvider>
        </div>
      </main>
    </AuthProvider>
  );
}

export default App;

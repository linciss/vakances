import React from 'react';
import HeroHome from '../../components/HeroHome';
import Testimonials from '../../components/Testimonials';
import About from '../../components/About';

const Home = () => {
  return (
    <div className="">
      <main className="flex-grow overflow-hidden">
        <HeroHome />
        <About />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;

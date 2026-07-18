
import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';

const Index: React.FC = () => {
  return (
    <MainLayout>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </MainLayout>
  );
};

export default Index;

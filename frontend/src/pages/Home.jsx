import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <About id="about" className="scroll-mt-20" />
      <Skills id="skills" className="scroll-mt-20" />
      <Projects id="projects" className="scroll-mt-20" />
      <Experience id="experience" className="scroll-mt-20" />
      <Contact id="contact" className="scroll-mt-20" />
      <Footer />
    </div>
  );
};

export default Home;
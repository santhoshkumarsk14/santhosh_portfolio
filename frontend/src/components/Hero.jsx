import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Download } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id="home" className="pt-24 md:pt-32 min-h-screen flex items-center bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-success rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center px-4 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Hi, I'm Santhoshkumar Ravichandran
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl lg:text-3xl text-secondary mb-8 font-medium">
            Data Analyst & Software Engineer
          </h2>

          <p className="text-lg md:text-xl text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
            "Transforming data into actionable insights through intelligent automation and interactive analytics"
          </p>

          <p className="text-base md:text-lg text-secondary mb-8">
            Trichy, Tamil Nadu, India
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection('#projects')}
              className="bg-accent hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span>View Projects</span>
            </button>

            <a
              href="/santhoshkumar_resume.pdf"
              download="Santhoshkumar_Ravichandran_Resume.pdf"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center space-x-2 hover:shadow-lg hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => scrollToSection('#about')}
            className="animate-bounce text-secondary hover:text-accent transition-colors"
            aria-label="Scroll to about section"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
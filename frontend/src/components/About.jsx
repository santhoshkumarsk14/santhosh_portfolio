import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, BarChart3, Zap } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: <BarChart3 className="w-8 h-8 text-accent" />,
      title: 'Data Analysis & Visualization',
      description: 'Transforming complex datasets into actionable insights through interactive dashboards and compelling visualizations.'
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: 'AI & Machine Learning',
      description: 'Building predictive models and AI-powered solutions to automate decision-making processes.'
    },
    {
      icon: <Database className="w-8 h-8 text-accent" />,
      title: 'Data Engineering',
      description: 'Designing robust data pipelines and ETL processes for efficient data processing and storage.'
    },
    {
      icon: <Code className="w-8 h-8 text-accent" />,
      title: 'Dashboard Development',
      description: 'Creating interactive web applications and dashboards using modern frameworks and tools.'
    }
  ];

  return (
    <section ref={aboutRef} id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Photo/Illustration Placeholder */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">SR</span>
                </div>
                <p className="text-secondary">Professional Photo</p>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              About Me
            </h2>

            <div className="space-y-4 text-secondary leading-relaxed">
              <p>
                I'm a Data Analyst and Software Engineer with 3+ years of experience transforming
                complex datasets into actionable business insights. My journey combines software
                engineering excellence with data science expertise, allowing me to build end-to-end
                solutions that not only analyze data but also deliver it through intuitive,
                interactive platforms.
              </p>

              <p>
                With a strong foundation in Java and Spring Boot, I've architected enterprise-grade
                applications and microservices while specializing in data analytics using Python,
                SQL, and Power BI. My work spans from developing sophisticated dashboards that
                improve decision accuracy by 35% to automating data workflows that reduce manual
                processing by 85%.
              </p>

              <p>
                Currently, I'm expanding my expertise in Machine Learning and Predictive Analytics
                through LogicMojo's Data Science program, where I'm mastering supervised and
                unsupervised learning algorithms, feature engineering, and advanced model evaluation
                techniques.
              </p>
            </div>

            {/* Services Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-primary mb-8">What I Do</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`bg-background p-6 rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <div className="mb-4">{service.icon}</div>
                    <h4 className="text-lg font-semibold text-primary mb-2">{service.title}</h4>
                    <p className="text-secondary text-sm leading-relaxed">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, ShieldCheck, Cloud } from 'lucide-react';

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

    const currentRef = aboutRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const services = [
    {
      icon: <Code className="w-8 h-8 text-accent" />,
      title: 'Backend & Microservices',
      description: 'Architecting fault-tolerant Spring Boot microservices and event-driven systems with RabbitMQ for enterprise-scale platforms.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: 'API Design & Security',
      description: 'Building and securing RESTful APIs with Spring Security and JWT authentication to eliminate unauthorized access.'
    },
    {
      icon: <Database className="w-8 h-8 text-accent" />,
      title: 'Database Engineering',
      description: 'Designing and optimizing MySQL schemas, stored procedures, and queries to cut execution time and improve throughput.'
    },
    {
      icon: <Cloud className="w-8 h-8 text-accent" />,
      title: 'Cloud & DevOps',
      description: 'Deploying and maintaining production workloads on AWS with Docker, Jenkins, and CI/CD pipelines.'
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
                I'm a Java Backend Developer with 3.5+ years of experience building scalable
                microservices and REST APIs using Spring Boot, RabbitMQ, and MySQL. I specialize in
                designing event-driven, fault-tolerant systems and deploying production workloads
                on AWS.
              </p>

              <p>
                At Relevantz Technologies, working on Tata Communications' enterprise platform,
                I architect Spring Boot microservices that ensure 99.9% uptime for millions of
                end-users and build event-driven communication between 10+ services using RabbitMQ.
                Earlier, at Solverminds, I led development of enterprise applications used by
                300+ users, securing them with Spring Security and role-based access control.
              </p>

              <p>
                Outside of core backend work, I've picked up some data analytics and ML fundamentals
                through LogicMojo's Data Science program, which sharpens how I reason about the data
                flowing through the systems I build.
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
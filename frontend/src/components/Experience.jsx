import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const experienceRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = experienceRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      position: "Software Engineer",
      company: "Relevantz Technologies — Client: Tata Communications Ltd",
      location: "Chennai, India",
      duration: "December 2025 – Present",
      current: true,
      achievements: [
        "Architected fault-tolerant Spring Boot microservices for an enterprise platform, ensuring 99.9% uptime for millions of end-users",
        "Built event-driven communication between 10+ services using RabbitMQ, increasing system throughput by 35%",
        "Optimized MySQL schemas, stored procedures, and multi-table queries, cutting query execution time by 30% for reporting workflows",
        "Secured REST APIs using Spring Security and JWT authentication, eliminating unauthorized access vectors",
        "Led peer code reviews and authored technical documentation, reducing onboarding time for new engineers by 20%",
        "Resolved production incidents through root-cause analysis, reducing repeat failures by 40% month-over-month"
      ],
      technologies: ["Java", "Spring Boot", "RabbitMQ", "MySQL", "Spring Security", "JWT", "AWS"]
    },
    {
      id: 2,
      position: "Associate Software Engineer",
      company: "Solverminds Solutions and Technologies",
      location: "Chennai, India",
      duration: "June 2022 – October 2024",
      current: false,
      achievements: [
        "Led development of a Requisition Management System (Java, Spring Boot, JSF, MySQL) serving 300+ enterprise users, achieving a 97% customer satisfaction rating",
        "Implemented Spring Security-based authentication and role-based access control across 5 enterprise applications, securing 10,000+ records",
        "Improved application performance by 40% by redesigning MySQL schemas and optimizing queries with the DBA team",
        "Integrated REST APIs with Angular frontend, reducing data-fetch latency by 25% and eliminating 3 recurring integration bugs",
        "Automated SQL reporting scripts, saving 15+ analyst-hours per month and reducing reporting errors to zero",
        "Drove Test-Driven Development practices, achieving 85%+ unit test coverage and cutting post-release defect rate by 30%"
      ],
      technologies: ["Java", "Spring Boot", "JSF", "MySQL", "Spring Security", "REST APIs", "Angular"]
    }
  ];

  const education = [
    {
      id: 1,
      type: "degree",
      title: "Bachelor of Engineering in Electrical and Electronics Engineering",
      institution: "K. Ramakrishnan College of Technology",
      location: "Tamil Nadu, India",
      duration: "June 2016 – November 2020",
      current: false
    }
  ];

  const allItems = [
    ...experiences.map(exp => ({ ...exp, type: 'work' })),
    ...education.map(edu => ({ ...edu, type: 'education' }))
  ];

  return (
    <section ref={experienceRef} id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Professional Journey
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Building scalable backend systems across enterprise software engineering roles
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-accent"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {allItems.map((item, index) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={`relative flex items-start space-x-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex-shrink-0 w-16 h-16 ${item.current ? 'border-2 border-accent bg-white' : 'bg-accent'} rounded-full flex items-center justify-center text-white shadow-lg`}>
                    {item.current ? <div className="w-6 h-6 bg-accent rounded-full"></div> : <Briefcase className="w-6 h-6" />}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-card p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">{item.position || item.title}</h3>
                        <p className="text-accent font-medium mb-1">{item.company || item.institution}</p>
                        <p className="text-secondary text-sm mb-2">{item.location}</p>
                      </div>
                      <div className="flex items-center text-secondary text-sm mt-2 sm:mt-0">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.duration}
                        {item.current && (
                          <span className="ml-2 px-2 py-1 bg-success text-white text-xs font-medium rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                    </div>

                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {item.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className="text-secondary text-sm flex items-start">
                              <CheckCircle className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              <span className="font-medium">{achievement.split(' ').slice(0, 2).join(' ')}</span> {achievement.split(' ').slice(2).join(' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="text-secondary text-sm flex items-start">
                              <CheckCircle className="w-4 h-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Tags */}
                    {(item.technologies || item.skills) && (
                      <div className="flex flex-wrap gap-2">
                        {(item.technologies || item.skills).map((tech, techIndex) => (
                          <span key={techIndex} className="px-3 py-1 bg-light-blue text-accent text-xs font-medium rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
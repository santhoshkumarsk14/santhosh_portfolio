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

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => {
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, []);

  const experiences = [
    {
      id: 1,
      position: "Software Engineer (Contract)",
      company: "ONE Click Solutions",
      location: "Singapore",
      duration: "December 2024 – May 2025",
      current: false,
      achievements: [
        "Designed data-driven web applications and dashboards using Python, Power BI, and SQL, improving decision accuracy by 35%",
        "Architected and deployed a Timesheet Automation System leveraging Microservices architecture, achieving 85% reduction in manual processing errors",
        "Developed a Timesheet Analytics System leveraging MySQL and Power BI to track productivity metrics, reducing manual reporting time by 85%",
        "Delivered maintainable code through Object-Oriented Programming principles, industry design patterns, and comprehensive testing methodologies"
      ],
      technologies: ["Python", "Power BI", "SQL", "Microservices", "MySQL", "Spring Boot"]
    },
    {
      id: 2,
      position: "Associate Software Engineer",
      company: "Solverminds Solutions and Technologies",
      location: "Chennai, India",
      duration: "June 2022 – October 2024",
      current: false,
      achievements: [
        "Spearheaded development of Requisition Management System, achieving 97% customer satisfaction through efficient full-stack implementation",
        "Constructed enterprise solutions using Java, Spring Boot, JSF, MySQL, and RESTful APIs to meet diverse business needs",
        "Created automated SQL scripts for generating weekly and monthly performance reports",
        "Developed backend logic to extract, clean, and store structured data for financial and inventory reporting"
      ],
      technologies: ["Java", "Spring Boot", "JSF", "MySQL", "RESTful APIs", "SQL"]
    }
  ];

  const education = [
    {
      id: 1,
      type: "course",
      title: "Data Scientist with Machine Learning Program",
      institution: "LogicMojo",
      duration: "June 2024 – Present",
      current: true,
      highlights: [
        "Completed foundational modules covering Python, Pandas, NumPy, and Data Visualization Techniques",
        "Gained hands-on experience creating interactive dashboards and analytical reports using Power BI",
        "Studying supervised and unsupervised machine learning algorithms, data preprocessing, model evaluation techniques, and feature engineering methodologies"
      ],
      skills: ["Python", "Pandas", "NumPy", "Data Visualization", "Power BI", "Machine Learning", "Feature Engineering"]
    },
    {
      id: 2,
      type: "degree",
      title: "Bachelor of Engineering in Electrical and Electronics Engineering",
      institution: "K. Ramakrishnan College of Technology",
      location: "Tamil Nadu, India",
      duration: "June 2016 – November 2020",
      current: false
    }
  ];


  const allItems = [
    ...education.filter(edu => edu.current).map(edu => ({ ...edu, type: 'education' })),
    ...experiences.filter(exp => exp.company === "ONE Click Solutions").map(exp => ({ ...exp, type: 'work' })),
    ...experiences.filter(exp => exp.company === "Solverminds Solutions and Technologies").map(exp => ({ ...exp, type: 'work' })),
    ...education.filter(edu => !edu.current).map(edu => ({ ...edu, type: 'education' }))
  ];

  return (
    <section ref={experienceRef} id="experience" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Professional Journey
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Building data-driven solutions across analytics and software engineering
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
                  key={item.id}
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
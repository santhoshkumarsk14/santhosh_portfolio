import React from 'react';
import Navbar from '../components/Navbar';
import SkillBar from '../components/SkillBar';
import Footer from '../components/Footer';

const About = () => {
  const skills = [
    { skill: 'Java', level: 90 },
    { skill: 'Spring Boot', level: 90 },
    { skill: 'Microservices', level: 85 },
    { skill: 'MySQL', level: 85 },
    { skill: 'RESTful API Design', level: 90 },
    { skill: 'Spring Security', level: 80 },
    { skill: 'RabbitMQ', level: 75 },
    { skill: 'React.js', level: 70 }
  ];

  return (
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-12 text-primary">
            About Me
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">
                My Story
              </h2>
              <p className="text-text-secondary mb-6 leading-relaxed">
                I'm Santhoshkumar Ravichandran, a Java Backend Developer with 3.5+ years of experience
                building scalable microservices and REST APIs using Spring Boot, RabbitMQ, and MySQL.
                I specialize in designing event-driven, fault-tolerant systems and deploying production
                workloads on AWS.
              </p>
              <p className="text-text-secondary leading-relaxed">
                I'm seeking a backend engineering role at a product-based company where I can keep building
                reliable, well-tested systems at scale.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">
                Skills & Expertise
              </h2>
              {skills.map((skill, index) => (
                <SkillBar key={index} skill={skill.skill} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
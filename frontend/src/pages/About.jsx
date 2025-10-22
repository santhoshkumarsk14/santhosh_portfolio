import React from 'react';
import Navbar from '../components/Navbar';
import SkillBar from '../components/SkillBar';
import Footer from '../components/Footer';

const About = () => {
  const skills = [
    { skill: 'Python', level: 95 },
    { skill: 'Pandas & NumPy', level: 90 },
    { skill: 'Machine Learning', level: 85 },
    { skill: 'SQL', level: 80 },
    { skill: 'Data Visualization', level: 90 },
    { skill: 'AI/ML Frameworks', level: 85 },
    { skill: 'Streamlit', level: 90 },
    { skill: 'React.js', level: 75 }
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
                I'm Santhoshkumar Ravichandran, a passionate data analyst who loves turning complex datasets
                into meaningful insights. With a background in data science and AI, I specialize in creating
                interactive dashboards and AI-powered applications that help businesses make data-driven decisions.
              </p>
              <p className="text-text-secondary leading-relaxed">
                My approach combines technical expertise with creative storytelling to make data accessible
                and actionable for everyone.
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
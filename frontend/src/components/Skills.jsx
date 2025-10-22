import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, BarChart3, Cpu, Monitor, Server, Cloud, Wrench } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const skillCategories = [
    {
      category: 'Data Analysis & Processing',
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: 'Python', level: 'Expert', icon: <Code className="w-6 h-6" />, years: '3+', color: '#3776AB' },
        { name: 'Pandas', level: 'Expert', icon: <Database className="w-6 h-6" />, years: '3+', color: '#150458' },
        { name: 'NumPy', level: 'Expert', icon: <BarChart3 className="w-6 h-6" />, years: '3+', color: '#013243' },
        { name: 'SQL', level: 'Advanced', icon: <Database className="w-6 h-6" />, years: '3+', color: '#4479A1' }
      ]
    },
    {
      category: 'Machine Learning',
      icon: <Cpu className="w-8 h-8" />,
      skills: [
        { name: 'Scikit-learn', level: 'Advanced', icon: <Cpu className="w-6 h-6" />, years: '1+', color: '#F7931E' },
        { name: 'TensorFlow', level: 'Intermediate', icon: <Cpu className="w-6 h-6" />, years: '1+', color: '#FF6F00' },
        { name: 'PyTorch', level: 'Intermediate', icon: <Cpu className="w-6 h-6" />, years: '1+', color: '#EE4C2C' },
        { name: 'Feature Engineering', level: 'Advanced', icon: <Wrench className="w-6 h-6" />, years: '2+', color: '#3B82F6' }
      ]
    },
    {
      category: 'Data Visualization',
      icon: <BarChart3 className="w-8 h-8" />,
      skills: [
        { name: 'Power BI', level: 'Advanced', icon: <BarChart3 className="w-6 h-6" />, years: '2+', color: '#F2C811' },
        { name: 'Tableau', level: 'Expert', icon: <BarChart3 className="w-6 h-6" />, years: '2+', color: '#E97627' },
        { name: 'Plotly', level: 'Advanced', icon: <BarChart3 className="w-6 h-6" />, years: '2+', color: '#3F4F75' },
        { name: 'Matplotlib', level: 'Advanced', icon: <BarChart3 className="w-6 h-6" />, years: '3+', color: '#11557C' }
      ]
    },
    {
      category: 'Backend Development',
      icon: <Server className="w-8 h-8" />,
      skills: [
        { name: 'Java', level: 'Expert', icon: <Code className="w-6 h-6" />, years: '3+', color: '#007396' },
        { name: 'Spring Boot', level: 'Expert', icon: <Server className="w-6 h-6" />, years: '3+', color: '#6DB33F' },
        { name: 'Microservices', level: 'Advanced', icon: <Server className="w-6 h-6" />, years: '2+', color: '#3B82F6' },
        { name: 'REST APIs', level: 'Expert', icon: <Server className="w-6 h-6" />, years: '3+', color: '#009688' },
        { name: 'MySQL', level: 'Advanced', icon: <Database className="w-6 h-6" />, years: '3+', color: '#4479A1' }
      ]
    },
    {
      category: 'Frontend Development',
      icon: <Monitor className="w-8 h-8" />,
      skills: [
        { name: 'React.js', level: 'Intermediate', icon: <Monitor className="w-6 h-6" />, years: '1+', color: '#61DAFB' },
        { name: 'Tailwind CSS', level: 'Advanced', icon: <Monitor className="w-6 h-6" />, years: '1+', color: '#06B6D4' },
        { name: 'JavaScript', level: 'Advanced', icon: <Code className="w-6 h-6" />, years: '2+', color: '#F7DF1E' },
        { name: 'JSF', level: 'Advanced', icon: <Monitor className="w-6 h-6" />, years: '2+', color: '#007396' }
      ]
    },
    {
      category: 'Cloud & DevOps',
      icon: <Cloud className="w-8 h-8" />,
      skills: [
        { name: 'AWS', level: 'Intermediate', icon: <Cloud className="w-6 h-6" />, years: '2+', color: '#FF9900' },
        { name: 'Docker', level: 'Intermediate', icon: <Server className="w-6 h-6" />, years: '2+', color: '#2496ED' },
        { name: 'Git', level: 'Advanced', icon: <Code className="w-6 h-6" />, years: '3+', color: '#F05032' },
        { name: 'Jenkins', level: 'Intermediate', icon: <Server className="w-6 h-6" />, years: '1+', color: '#D24939' },
        { name: 'Maven', level: 'Advanced', icon: <Wrench className="w-6 h-6" />, years: '3+', color: '#C71A36' }
      ]
    }
  ];


  return (
    <section ref={skillsRef} id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Skills & Technologies
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            A comprehensive toolkit for data analysis, machine learning, and full-stack development
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['All', 'Data Analysis & Processing', 'Machine Learning', 'Data Visualization', 'Backend Development', 'Frontend Development', 'Cloud & DevOps'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
          {skillCategories.flatMap(category =>
            category.skills
              .filter(skill => activeFilter === 'All' || category.category === activeFilter)
              .map((skill, skillIndex) => (
                <div
                  key={`${category.category}-${skillIndex}`}
                  className={`group relative bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${(skillCategories.indexOf(category) * category.skills.length + skillIndex) * 50}ms` }}
                >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                </div>

                {/* Technology Name */}
                <h3 className="text-lg font-semibold text-primary text-center mb-2">
                  {skill.name}
                </h3>

                {/* Proficiency Badge */}
                <div className="flex justify-center">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                    skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {skill.level}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                  <span className="text-white font-semibold">{skill.years} experience</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Additional Tools Section */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold text-primary mb-8">Additional Tools & Platforms</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Git', 'Jupyter', 'VS Code', 'Azure', 'Google Analytics', 'Excel'].map((tool, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-card border rounded-full text-primary font-medium hover:bg-accent hover:text-white transition-all duration-300 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
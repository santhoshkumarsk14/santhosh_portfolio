import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const projectsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Business Analytics Dashboard',
      description: 'Interactive dashboard for sales and performance analysis with AI predictions and real-time KPI monitoring.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'Streamlit', 'Pandas', 'Plotly'],
      category: 'Analytics',
      liveLink: '/project1',
      githubLink: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Finance & Investment Insights',
      description: 'Stock market analysis platform with AI trend alerts, risk metrics, and portfolio optimization.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'TensorFlow', 'Tableau', 'AWS'],
      category: 'Analytics',
      liveLink: '/project2',
      githubLink: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Social Media Sentiment Analyzer',
      description: 'Real-time sentiment analysis of social media data with trending topics and brand monitoring.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'NLP', 'React', 'D3.js'],
      category: 'ML',
      liveLink: '/project3',
      githubLink: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Recommendation Engine',
      description: 'Personalized recommendation system using collaborative filtering and deep learning techniques.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'PyTorch', 'FastAPI', 'PostgreSQL'],
      category: 'ML',
      liveLink: '/project4',
      githubLink: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Automation & Reporting System',
      description: 'Automated report generation from CSV data with AI insights and scheduled email delivery.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'Pandas', 'SMTP', 'Docker'],
      category: 'Automation',
      liveLink: '/project5',
      githubLink: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Interactive "What-If" Scenario Tool',
      description: 'Dynamic scenario analysis with real-time KPI simulations and predictive modeling.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'Streamlit', 'Scikit-learn', 'Plotly'],
      category: 'Dashboards',
      liveLink: '/project6',
      githubLink: '#',
      featured: false
    }
  ];

  const categories = ['All', 'Analytics', 'ML', 'Dashboards', 'Automation'];

  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.category === filter);

  return (
    <section ref={projectsRef} id="projects" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-secondary max-w-2xl mx-auto">
            A showcase of data analytics projects, machine learning models, and interactive dashboards
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-accent text-white shadow-lg'
                  : 'bg-background text-primary hover:bg-accent/10 border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`bg-background rounded-xl shadow-sm border overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-accent/20 to-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-primary/60">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold">{project.title.charAt(0)}</span>
                    </div>
                    <p className="text-sm">Project Preview</p>
                  </div>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-success text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={project.liveLink}
                    className="flex-1 bg-accent hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button className="p-2 border border-secondary/30 rounded-lg hover:bg-secondary/10 transition-colors">
                    <Github className="w-4 h-4 text-secondary" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
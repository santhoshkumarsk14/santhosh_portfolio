import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-text-secondary mb-4 line-clamp-3">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center text-accent hover:text-blue-600 font-medium transition-colors"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
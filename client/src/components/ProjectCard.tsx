import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags?: string[];
  demoLink?: string;
  githubLink?: string;
  featured?: boolean;
}

// ProjectCard component that displays project information
const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  image, 
  tags = [], 
  demoLink, 
  githubLink,
  featured = false
}) => {
  return (
    <div className={`
      h-full flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 
      bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-md
      ${featured ? 'lg:col-span-2' : ''}
    `}>
      {/* Project Image with Overlay on Hover */}
      <div className="relative overflow-hidden group h-56">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Hover Overlay with Quick Links */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div className="flex flex-wrap gap-2">
            {demoLink && (
              <a 
                href={demoLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <ExternalLink size={14} />
                <span>Live Demo</span>
              </a>
            )}
            
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white bg-gray-800 hover:bg-gray-900 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <Github size={14} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          
          {/* View Details Icon */}
          <div className="p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200 cursor-pointer">
            <ArrowUpRight size={18} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400" />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-grow">{description}</p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard; 
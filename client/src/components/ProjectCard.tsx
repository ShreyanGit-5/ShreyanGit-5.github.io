import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  codePreview?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  codePreview,
  technologies,
  liveUrl,
  githubUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="group relative rounded-2xl bg-[#0F0F14] border border-cream/10 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Laptop Mockup */}
      <div className="relative aspect-[16/10] rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1A1F] rounded-t-lg">
          {/* Laptop Frame */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-[#0F0F14] rounded-t-lg flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cream/20" />
            <div className="w-2 h-2 rounded-full bg-cream/20" />
            <div className="w-2 h-2 rounded-full bg-cream/20" />
          </div>
          
          {/* Project Screenshot/Preview */}
          <motion.div 
            className="absolute inset-0 mt-6"
            animate={{
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.4 }}
          >
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-cream/5 animate-pulse rounded-t-lg" />
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-cream mb-2">{title}</h3>
        <p className="text-cream/70 mb-4">{description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-[#2DB7FF]/10 text-[#2DB7FF] border border-[#2DB7FF]/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
            >
              <ExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
            >
              <Github size={18} />
              <span>View Code</span>
            </a>
          )}
          {codePreview && (
            <button
              className="flex items-center gap-2 text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
              onClick={() => {/* Toggle code preview */}}
            >
              <Code size={18} />
              <span>Preview Code</span>
            </button>
          )}
        </div>
      </div>

      {/* Hover Effects */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-t from-[#0F0F14] to-transparent pointer-events-none"
        animate={{
          opacity: isHovered ? 0.5 : 0
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;
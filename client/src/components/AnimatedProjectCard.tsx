import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { fadeInVariants, scaleVariants } from '../lib/animations';

// Set Modal app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveLink: string;
  repoLink: string;
  challenges: string;
  solutions: string;
}

interface AnimatedProjectCardProps {
  project: Project;
  className?: string;
  [key: string]: any; // For additional props
}

/**
 * AnimatedProjectCard - A component for project cards with hover animations
 * 
 * @param {AnimatedProjectCardProps} props - Component props
 * @returns {JSX.Element} - Animated project card component
 */
const AnimatedProjectCard: React.FC<AnimatedProjectCardProps> = ({ project, className = '', ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  // Handle image loading
  useEffect(() => {
    const img = new Image();
    img.src = project.image;
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);
    };
  }, [project.image]);

  // Open modal
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg flex flex-col ${className}`}
      variants={fadeInVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {/* Project Image with Hover Icons */}
      <div className="relative aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800 overflow-hidden group">
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-contain transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-90 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            width={800}
            height={450}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            srcSet={`
              ${project.image}?w=400&h=225&fit=contain&auto=format 400w,
              ${project.image}?w=600&h=338&fit=contain&auto=format 600w,
              ${project.image}?w=800&h=450&fit=contain&auto=format 800w
            `}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xl sm:text-2xl font-bold">
            {project.title[0]}
          </div>
        )}
        
        {/* Loading state */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Artistic Hover Overlay - minimalist style with fluid transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out backdrop-blur-[2px]">
          <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {project.repoLink && (
              <motion.a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code"
                className="project-icon icon-link w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg"
                variants={scaleVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <FaGithub className="text-white text-xl" />
                </div>
              </motion.a>
            )}
            
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
                className="project-icon icon-link w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg"
                variants={scaleVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <FaExternalLinkAlt className="text-white text-xl" />
                </div>
              </motion.a>
            )}
          </div>
        </div>
      </div>
      
      {/* Project Content */}
      <div className="p-5 sm:p-6 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{project.title}</h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-5 line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
            {project.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* Actions - Simplified to only Read More button */}
        <div className="flex items-center justify-end mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Read More Button */}
          <motion.button
            onClick={openModal}
            className="text-xs sm:text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md transition-colors font-medium shadow-sm"
            variants={scaleVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Read More
          </motion.button>
        </div>
      </div>
      
      {/* Project Details Modal - Narrower and more centered */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl max-w-xl mx-auto my-16 focus:outline-none border border-gray-200 dark:border-gray-700 shadow-xl overflow-auto max-h-[85vh]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-4 py-10"
        contentLabel={`${project.title} Details`}
      >
        <div className="flex flex-col">
          {/* Header with Close Button */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{project.title}</h2>
            <motion.button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
              variants={scaleVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          {/* Project image in modal */}
          {project.image && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-md">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-52 sm:h-64 md:h-72 object-cover"
                loading="lazy"
                width={800}
                height={480}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                srcSet={`
                  ${project.image}?w=400&h=240&fit=crop&auto=format 400w,
                  ${project.image}?w=600&h=360&fit=crop&auto=format 600w,
                  ${project.image}?w=800&h=480&fit=crop&auto=format 800w
                `}
              />
            </div>
          )}
          
          {/* Project Tech Stack */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags && project.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Project Description */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Overview</h3>
            <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>
          
          {/* Project Challenges */}
          {project.challenges && (
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Challenges</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.challenges}
              </p>
            </div>
          )}
          
          {/* Project Solutions */}
          {project.solutions && (
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Solutions</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.solutions}
              </p>
            </div>
          )}
          
          {/* Project Links */}
          <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                <FaExternalLinkAlt className="text-sm" />
                <span>View Live Demo</span>
              </a>
            )}
            
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors shadow-sm"
              >
                <FaGithub className="text-sm" />
                <span>Source Code</span>
              </a>
            )}
            
            <button
              onClick={closeModal}
              className="ml-auto flex items-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default AnimatedProjectCard;
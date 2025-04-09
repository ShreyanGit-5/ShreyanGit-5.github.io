import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import Modal from 'react-modal';

// Set Modal app element for accessibility
if (typeof window !== 'undefined') {
  Modal.setAppElement('#root');
}

/**
 * AnimatedProjectCard - A component for project cards with hover animations
 * 
 * @param {Object} props - Component props
 * @param {Object} props.project - Project data
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Animated project card component
 */
const AnimatedProjectCard = ({ project, className = '', ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg flex flex-col ${className}`}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {/* Project Image with Hover Icons */}
      <div className="relative h-48 sm:h-52 md:h-56 lg:h-64 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden group">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-90"
            loading="lazy" // For better performance
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xl sm:text-2xl font-bold">
            {project.title[0]}
          </div>
        )}
        
        {/* Artistic Hover Overlay - minimalist style with fluid transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out backdrop-blur-[2px]">
          <div className="flex gap-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            {project.repoLink && (
              <motion.a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className="text-white text-xl" />
              </motion.a>
            )}
            
            {project.liveLink && (
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View live demo"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaExternalLinkAlt className="text-white text-lg" />
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
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
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
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Project image in modal */}
          {project.image && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-md">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-52 sm:h-64 md:h-72 object-cover"
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
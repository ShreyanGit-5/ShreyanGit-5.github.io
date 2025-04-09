import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Twitter, Code } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const AboutSection = ({ 
  name = "Jane Doe", 
  title = "Full Stack Developer",
  bio = "I'm a passionate developer with experience building web applications.",
  skills = [],
  experience = [],
  education = []
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Staggered item animation
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const listItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      <AnimatedSection className="text-center mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">About Me</h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl sm:max-w-2xl mx-auto">
          Get to know more about my background, skills, and experience.
        </p>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
        {/* Profile Section */}
        <AnimatedSection className="lg:col-span-1 md:mb-6 lg:mb-0">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
            variants={cardVariants}
          >
            {/* Profile Image */}
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-blue-500 text-white text-3xl sm:text-4xl font-bold flex items-center justify-center">
                {name[0]}
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="p-4 sm:p-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{name}</h2>
              <p className="text-blue-600 dark:text-blue-400 mb-3 sm:mb-4">{title}</p>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">{bio}</p>
              
              {/* Social Links for About Page */}
              <motion.div 
                className="flex justify-center space-x-3 sm:space-x-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.3,
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {/* LinkedIn */}
                <motion.a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 flex items-center justify-center text-white shadow-md"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <Linkedin size={18} />
                </motion.a>
                
                {/* GitHub */}
                <motion.a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center text-white shadow-md"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 0 15px rgba(75, 85, 99, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <Github size={18} />
                </motion.a>
                
                {/* Twitter (without label) */}
                <motion.a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Twitter profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 dark:from-blue-500 dark:to-blue-600 flex items-center justify-center text-white shadow-md"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <Twitter size={18} />
                </motion.a>
                
                {/* LeetCode (using Code icon) */}
                <motion.a
                  href="https://leetcode.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LeetCode profile"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 flex items-center justify-center text-white shadow-md"
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 0 15px rgba(251, 191, 36, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: { y: 0, opacity: 1 }
                  }}
                >
                  <Code size={18} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
        
        {/* Skills & Experience */}
        <AnimatedSection className="md:col-span-2 lg:col-span-2">
          {/* Skills */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-6 sm:mb-8"
            variants={cardVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Skills & Technologies</h2>
            
            <motion.div 
              className="flex flex-wrap gap-1.5 sm:gap-2"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm"
                  variants={listItemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: '#93c5fd', // blue-300
                    color: '#1e40af' // blue-800  
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Experience */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-700 mb-6 sm:mb-8"
            variants={cardVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Work Experience</h2>
            
            <motion.div
              className="space-y-4 sm:space-y-6"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {experience.map((job, index) => (
                <motion.div 
                  key={index}
                  className="border-l-2 border-blue-500 pl-3 sm:pl-4 ml-1 sm:ml-2"
                  variants={listItemVariants}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">{job.title}</h3>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{job.period}</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">{job.company}</p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{job.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          {/* Education */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-gray-200 dark:border-gray-700"
            variants={cardVariants}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">Education</h2>
            
            <motion.div
              className="space-y-4 sm:space-y-6"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {education.map((edu, index) => (
                <motion.div 
                  key={index}
                  className="border-l-2 border-blue-500 pl-3 sm:pl-4 ml-1 sm:ml-2"
                  variants={listItemVariants}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h3>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{edu.year}</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default AboutSection;
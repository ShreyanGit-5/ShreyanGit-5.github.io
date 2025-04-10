import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import AnimatedButton from './AnimatedButton';

const Hero = () => {
  const [, setLocation] = useLocation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
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

  const handleNavigation = (path) => {
    setLocation(path);
  };

  return (
    <div className="bg-gradient-to-br from-[#1E3A8A] to-[#9333EA] min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 md:py-24 w-full max-w-7xl">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-tight"
            variants={itemVariants}
          >
            <span className="text-[#F9FAFB]">
              Creative Developer
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-[#F9FAFB]/90 mb-6 sm:mb-8 md:mb-10 max-w-xl sm:max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            I craft engaging, user-centric web applications with modern technologies and clean, intuitive designs. Let's turn your vision into reality.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            variants={itemVariants}
          >
            <AnimatedButton 
              onClick={() => handleNavigation('/projects')}
              className="w-full sm:w-auto min-w-[200px] bg-[#3B82F6] text-white rounded-[12px] py-4 px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              View My Work
            </AnimatedButton>
            <AnimatedButton 
              onClick={() => handleNavigation('/contact')}
              className="w-full sm:w-auto min-w-[200px] rounded-[12px] py-4 px-6 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-400/20"
              isContactButton={true}
            >
              Get In Touch
            </AnimatedButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
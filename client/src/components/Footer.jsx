import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Minimal footer component with copyright information
 * 
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.footer 
      className={`${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-[#F9FAFB] text-gray-700'} py-6 text-center transition-colors duration-200`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium tracking-wide">
          © {currentYear} Your Name. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
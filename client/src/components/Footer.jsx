import React from 'react';
import { motion } from 'framer-motion';

/**
 * Minimal footer component with copyright information
 * 
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Container and item animation variants
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
      className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            © {currentYear} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
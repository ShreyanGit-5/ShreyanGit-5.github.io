import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Code, Twitter } from 'lucide-react';

/**
 * Footer component with social media links and copyright information
 * 
 * @returns {JSX.Element} The footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Footer links with icons
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/',
      icon: <Linkedin size={20} />,
      ariaLabel: 'Visit my LinkedIn profile'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/',
      icon: <Github size={20} />,
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'Email',
      url: 'mailto:contact@example.com',
      icon: <Mail size={20} />,
      ariaLabel: 'Send me an email'
    }
  ];
  
  // Container and item animation variants
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
        stiffness: 300,
        damping: 24
      }
    }
  };
  
  return (
    <footer className="w-full py-6 sm:py-8 mt-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright and attribution */}
          <motion.div 
            className="mb-4 md:mb-0 text-center md:text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Built with React & Framer Motion
            </p>
          </motion.div>
          
          {/* Social media links */}
          <motion.div
            className="flex items-center space-x-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.2,
                  color: "#4F46E5", // Indigo color
                  textShadow: "0px 0px 8px rgba(79, 70, 229, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
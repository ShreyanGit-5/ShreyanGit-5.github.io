import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

/**
 * AnimatedNavLink - A navigation link component with animations
 * 
 * @param {Object} props - Component props
 * @param {string} props.href - Link destination
 * @param {React.ReactNode} props.children - Link content
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Animated navigation link component
 */
const AnimatedNavLink = ({ href, children, className = '', ...props }) => {
  const [location, navigate] = useLocation();
  const isActive = location === href;
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(href);
  };
  
  return (
    <motion.div
      className={`relative px-3 py-2 text-base font-medium cursor-pointer ${isActive 
        ? 'text-blue-600 dark:text-blue-400' 
        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      } ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
      
      {/* Animated underline */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-blue-600 dark:bg-blue-400"
          layoutId="navlink-underline"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedNavLink;
import React from 'react';
import { motion } from 'framer-motion';

/**
 * AnimatedButton - A button component with hover and tap animations
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @returns {JSX.Element} - Animated button component
 */
const AnimatedButton = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  // Base Tailwind classes for the button
  const baseClasses = `px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`;
  
  // Determine button color based on disabled state
  const colorClasses = disabled
    ? 'bg-gray-400 cursor-not-allowed'
    : 'bg-blue-600 dark:bg-blue-500';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        scale: 1.02,
        backgroundColor: '#2563eb', // blue-600 in Tailwind
        transition: { duration: 0.2 }
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98, 
        transition: { duration: 0.1 }
      } : {}}
      {...props}
    >
      {children}
    </motion.button>
  );
};

/**
 * AnimatedIconButton - A smaller button with an icon, featuring animations
 */
export const AnimatedIconButton = ({ 
  children, 
  className = '', 
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      type="button"
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.9,
        transition: { duration: 0.1 }
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
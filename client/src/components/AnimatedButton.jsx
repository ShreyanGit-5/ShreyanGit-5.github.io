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
 * @param {boolean} props.isContactButton - Whether this is the "Get In Touch" button
 * @returns {JSX.Element} - Animated button component
 */
const AnimatedButton = ({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  isContactButton = false,
  ...props
}) => {
  // Base Tailwind classes for the button
  const baseClasses = `px-6 py-3 rounded-lg font-medium text-white transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-opacity-50`;
  
  // Determine button color based on disabled state and type
  const colorClasses = disabled
    ? 'bg-gray-400 cursor-not-allowed'
    : isContactButton
      ? 'bg-gray-800 dark:bg-gray-700 focus:ring-emerald-500'
      : 'bg-blue-600 dark:bg-blue-500 focus:ring-blue-500';
  
  return (
    <motion.button
      type={type}
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        scale: isContactButton ? 1.05 : 1.02,
        backgroundColor: isContactButton ? '#10b981' : '#2563eb', // emerald-500 or blue-600
        boxShadow: isContactButton 
          ? '0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.2)' 
          : 'none',
        transition: { 
          type: "spring",
          stiffness: 800,
          damping: 20,
          duration: 0.1
        }
      } : {}}
      whileTap={!disabled ? { 
        scale: isContactButton ? 0.95 : 0.98,
        backgroundColor: isContactButton ? '#059669' : '#1d4ed8', // emerald-600 or blue-700
        transition: { 
          type: "spring",
          stiffness: 900,
          damping: 25,
          duration: 0.08
        }
      } : {}}
      {...props}
    >
      <motion.span
        className="flex items-center justify-center"
        whileHover={isContactButton ? {
          x: 4,
          transition: { 
            type: "spring",
            stiffness: 800,
            damping: 20,
            duration: 0.1
          }
        } : {}}
      >
        {children}
      </motion.span>
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
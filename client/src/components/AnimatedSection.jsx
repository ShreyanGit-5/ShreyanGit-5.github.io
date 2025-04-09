import React from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * AnimatedSection - A component that animates its children when they come into view
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to animate
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.variants - Custom animation variants
 * @param {Object} props.options - Custom intersection observer options
 * @returns {JSX.Element} - Animated section component
 */
const AnimatedSection = ({ 
  children, 
  className = '', 
  variants = null,
  options = {},
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation({
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px'
  });

  // Default animation variants
  const defaultVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  // Child animation variants (for staggered animations)
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants || defaultVariants}
      className={className}
      {...props}
    >
      {typeof children === 'function' ? children(childVariants) : children}
    </motion.div>
  );
};

export default AnimatedSection;
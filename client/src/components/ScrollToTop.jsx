import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

/**
 * A scroll-to-top button component that appears when the user scrolls down
 * and smoothly scrolls back to the top when clicked
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down 300px from the top
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed z-50 bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300 focus:ring-offset-2"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 0.3 
          }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="h-6 w-6" />
          
          {/* Ripple effect */}
          <motion.span
            className="absolute inset-0 rounded-full bg-white"
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ 
              scale: 1.5, 
              opacity: 0,
              transition: { 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeOut",
                repeatDelay: 0.5
              }
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
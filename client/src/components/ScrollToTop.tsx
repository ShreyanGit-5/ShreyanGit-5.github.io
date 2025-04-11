import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { fadeInVariants, scaleVariants } from '../lib/animations';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full glass-effect z-50
                   text-cream/70 hover:text-[#2DB7FF] 
                   hover:bg-cream/10 transition-all duration-300
                   shadow-lg shadow-black/25 hover:shadow-[#2DB7FF]/25"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
          
          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(45, 183, 255, 0)',
                '0 0 0 8px rgba(45, 183, 255, 0)'
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut'
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
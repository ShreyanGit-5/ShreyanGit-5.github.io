import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { scaleVariants } from '../lib/animations';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      variants={scaleVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={toggleTheme}
      className="p-2 rounded-full bg-cream/5 text-cream/70 hover:text-[#2DB7FF] hover:bg-cream/10 
                transition-all duration-300 focus:outline-none focus:ring-2 
                focus:ring-[#2DB7FF] focus:ring-opacity-50"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
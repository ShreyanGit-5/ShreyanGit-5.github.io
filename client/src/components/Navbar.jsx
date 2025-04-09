import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import AnimatedNavLink from './AnimatedNavLink';
import { AnimatedIconButton } from './AnimatedButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  // Handle scrolling to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navbar variants for animations
  const navbarVariants = {
    scrolled: {
      backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      height: '64px',
      padding: '0.5rem 1.5rem'
    },
    top: {
      backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)',
      backdropFilter: 'none',
      boxShadow: 'none',
      height: '72px',
      padding: '0.75rem 1.5rem'
    }
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    open: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        className="transition-colors duration-300"
        initial="top"
        animate={isScrolled ? 'scrolled' : 'top'}
        variants={navbarVariants}
      >
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a 
            href="/" 
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-4">
              <AnimatedNavLink href="/">Home</AnimatedNavLink>
              <AnimatedNavLink href="/about">About</AnimatedNavLink>
              <AnimatedNavLink href="/projects">Projects</AnimatedNavLink>
              <AnimatedNavLink href="/contact">Contact</AnimatedNavLink>
            </div>
            
            {/* Theme Toggle */}
            <AnimatedIconButton
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </AnimatedIconButton>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <AnimatedIconButton
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </AnimatedIconButton>
            
            <AnimatedIconButton
              onClick={toggleMobileMenu}
              className="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </AnimatedIconButton>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col px-4 py-2 space-y-1">
              <AnimatedNavLink href="/" className="py-3">Home</AnimatedNavLink>
              <AnimatedNavLink href="/about" className="py-3">About</AnimatedNavLink>
              <AnimatedNavLink href="/projects" className="py-3">Projects</AnimatedNavLink>
              <AnimatedNavLink href="/contact" className="py-3">Contact</AnimatedNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
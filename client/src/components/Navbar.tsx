import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Icons for mobile menu
import { cn } from '../lib/utils';
import { fadeInVariants, scaleVariants } from '../lib/animations';
// Removed: import ThemeToggle from './ThemeToggle';

// Placeholder for your Phoenix Logo component/image
const PhoenixLogo = () => (
  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
    {/* Replace with actual SVG or Image */}
    P
  </div>
);

const MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' }, // Updated label
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  // isScrolled state might not be needed if the navbar style is fixed
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setIsScrolled(window.scrollY > 20);
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    // Close mobile menu on navigation
    if (isOpen) setIsOpen(false);
  }, [location, isOpen]); // Added isOpen dependency

  const mobileMenuVariants = { 
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
   }; 
  const menuItemVariants = { 
     closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
   }; 

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" // Darker overlay
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Outer nav positioned fixed at the top */}
      <motion.nav
        className={cn(
          'fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4' // Added horizontal padding
          // Removed scroll-based class changes: isScrolled ? 'glass-effect py-2' : 'py-4 bg-transparent'
        )}
        variants={fadeInVariants} // Optional fade-in animation
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Logo on the left */}
          <motion.div
            className="flex-shrink-0"
            variants={scaleVariants} // Optional scaling animation
            whileHover="hover"
            whileTap="tap"
          >
            <Link to="/" aria-label="Homepage">
              <PhoenixLogo />
            </Link>
          </motion.div>

          {/* Centered Navigation Links Container (Desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
             <div className="flex items-center space-x-2 bg-ui-grey/80 backdrop-blur-md border border-border/50 shadow-md rounded-full px-4 py-1.5">
                {MENU_ITEMS.map(({ href, label }) => (
                  <Link
                    key={href}
                    to={href}
                    className={cn(
                      'nav-link', // Use class from index.css
                      location.pathname === href && 'nav-link-active' // Use active class from index.css
                    )}
                    aria-current={location.pathname === href ? 'page' : undefined}
                  >
                    {label}
                    {/* Removed motion.div underline indicator */}
                  </Link>
                ))}
              </div>
          </div>


          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-secondary-text hover:text-foreground transition-colors duration-300 z-50" // Ensure button is clickable over overlay
            onClick={() => setIsOpen(!isOpen)}
            variants={scaleVariants}
            whileTap="tap"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              // Style the mobile menu container
              className="md:hidden absolute inset-x-4 top-[calc(100%+0.5rem)] mt-2 p-4 bg-ui-grey/95 backdrop-blur-md rounded-xl shadow-lg border border-border/50"
            >
              <motion.div className="flex flex-col space-y-2">
                {MENU_ITEMS.map(({ href, label }, index) => (
                  <motion.div
                    key={href}
                    variants={menuItemVariants}
                    custom={index}
                  >
                    <Link
                      to={href}
                      className={cn(
                        'nav-link block py-2 text-center', // Centered text
                        location.pathname === href && 'nav-link-active'
                      )}
                      onClick={() => setIsOpen(false)} // Close menu on click
                       aria-current={location.pathname === href ? 'page' : undefined}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                {/* Removed ThemeToggle from mobile menu */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;

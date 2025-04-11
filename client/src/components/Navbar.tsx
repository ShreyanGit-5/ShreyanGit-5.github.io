import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { fadeInVariants, scaleVariants } from '../lib/animations';
import ThemeToggle from './ThemeToggle';

const MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [location]);

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled ? 'glass-effect py-2' : 'py-4 bg-transparent'
        )}
        variants={fadeInVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 px-6">
            <motion.div
              className="flex-shrink-0"
              variants={scaleVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2DB7FF] to-[#8A2BE2] hover:opacity-80 transition-opacity duration-300">
                <span className="electric-glow">SD</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {MENU_ITEMS.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className={cn(
                    'nav-link relative text-cream/90 hover:text-cream transition-all duration-300',
                    location.pathname === href && 'active-nav-link'
                  )}
                >
                  {label}
                  {location.pathname === href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#2DB7FF]"
                      layoutId="navbar-indicator"
                    />
                  )}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            <motion.button
              className="md:hidden p-2 text-cream/90 hover:text-cream transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
              variants={scaleVariants}
              whileTap="tap"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="md:hidden absolute inset-x-0 top-16 p-4 glass-effect rounded-b-2xl shadow-lg border-t border-cream/10"
              >
                <motion.div className="flex flex-col space-y-4">
                  {MENU_ITEMS.map(({ href, label }, index) => (
                    <motion.div
                      key={href}
                      variants={menuItemVariants}
                      custom={index}
                    >
                      <Link
                        to={href}
                        className={cn(
                          'nav-link block py-2 text-cream/90 hover:text-cream transition-colors duration-300',
                          location.pathname === href && 'active-nav-link'
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    variants={menuItemVariants}
                    className="pt-4 border-t border-cream/10"
                  >
                    <ThemeToggle />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

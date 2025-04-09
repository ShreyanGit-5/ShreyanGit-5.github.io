import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Handle window resize to close mobile menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if a link is active
  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  // State to track scrolling
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to add shadow and background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full backdrop-blur-sm",
        isScrolled 
          ? "bg-white/95 dark:bg-gray-900/95 shadow-md py-3" 
          : "bg-white/80 dark:bg-gray-900/80 py-4",
        className
      )}
    >
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-gray-200">DevPortfolio</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" active={isActive('/')}>Home</NavLink>
            <NavLink href="/about" active={isActive('/about')}>About</NavLink>
            <NavLink href="/projects" active={isActive('/projects')}>Projects</NavLink>
            <NavLink href="/contact" active={isActive('/contact')}>Contact</NavLink>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {/* Icon when menu is closed */}
              {!isMobileMenuOpen && (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
              {/* Icon when menu is open */}
              {isMobileMenuOpen && (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Container */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out backdrop-blur-md",
            isMobileMenuOpen 
              ? "max-h-[300px] opacity-100 mt-3 bg-white/95 dark:bg-gray-800/95 rounded-md shadow-lg" 
              : "max-h-0 opacity-0"
          )}
        >
          <div className="px-3 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/" active={isActive('/')}>Home</MobileNavLink>
            <MobileNavLink href="/about" active={isActive('/about')}>About</MobileNavLink>
            <MobileNavLink href="/projects" active={isActive('/projects')}>Projects</MobileNavLink>
            <MobileNavLink href="/contact" active={isActive('/contact')}>Contact</MobileNavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

// Desktop navigation link
interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, active, children }) => {
  return (
    <Link href={href}>
      <a className={cn(
        "group font-medium transition-all duration-300 relative px-2 py-1 rounded-md",
        active 
          ? "text-primary" 
          : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
      )}>
        {children}
        <span className={cn(
          "absolute bottom-[-2px] left-0 h-[2px] bg-primary transition-all duration-300 rounded-full",
          active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        )} />
      </a>
    </Link>
  );
};

// Mobile navigation link
const MobileNavLink: React.FC<NavLinkProps> = ({ href, active, children }) => {
  return (
    <Link href={href}>
      <a className={cn(
        "block px-4 py-2.5 rounded-md text-base font-medium transition-all duration-200",
        active 
          ? "text-white bg-primary shadow-md" 
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-primary dark:hover:text-primary"
      )}>
        {children}
      </a>
    </Link>
  );
};

export default Navbar;

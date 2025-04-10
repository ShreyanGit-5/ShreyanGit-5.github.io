import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

const MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' }
];

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}

interface CursorAuraProps {
  children: React.ReactNode;
}

const CursorAura: React.FC<CursorAuraProps> = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div 
      className="relative"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-[100px] opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(120px circle at var(--mouse-x) var(--mouse-y), rgb(var(--accent-light) / 0.15), transparent 80%)',
          WebkitMaskImage: 'radial-gradient(100% 100% at center center, black, transparent)',
          '--mouse-x': smoothX,
          '--mouse-y': smoothY,
        } as any}
      />
      {children}
    </motion.div>
  );
};

const MagneticLink: React.FC<NavLinkProps> = ({ href, children, isActive, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useSpring(0, { stiffness: 250, damping: 20 });
  const y = useSpring(0, { stiffness: 250, damping: 20 });

  const magneticScale = useTransform(x, [-20, 0, 20], [1.1, 1, 1.1]);
  const magneticRotateY = useTransform(x, [-20, 0, 20], [-5, 0, 5]);
  const glowOpacity = useTransform(x, [-20, 0, 20], [0.6, 0.4, 0.6]);

  useEffect(() => {
    if (!ref.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = ref.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 0, height: 0 };
      const xPosition = (e.clientX - bounds.left - bounds.width / 2) * 0.5;
      const yPosition = (e.clientY - bounds.top - bounds.height / 2) * 0.5;
      
      x.set(xPosition);
      y.set(yPosition);
    };

    const handleMouseLeave = () => {
      animate(x, 0, { type: "spring", stiffness: 250, damping: 20 });
      animate(y, 0, { type: "spring", stiffness: 250, damping: 20 });
    };

    ref.current.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      ref.current?.removeEventListener('mousemove', handleMouseMove);
      ref.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.div 
      ref={ref}
      className="relative group"
      style={{ x, y, scale: magneticScale, rotateY: magneticRotateY }}
    >
      <Link href={href}>
        <a
          onClick={onClick}
          data-sidebar="menu-button"
          className={cn(
            "relative px-6 py-3 text-lg transition-all duration-300",
            "hover:text-accent dark:hover:text-accent-400",
            "before:absolute before:inset-0 before:rounded-xl before:bg-accent/5",
            "before:opacity-0 before:transition-opacity hover:before:opacity-100",
            isActive && "text-accent dark:text-accent-400 active-nav-link"
          )}
          role="menuitem"
          aria-current={isActive ? "page" : undefined}
        >
          {children}
          {/* Glow effect background */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-400/10 via-accent/10 to-accent-600/10"
            style={{ opacity: glowOpacity }}
          />
          {/* Active state glow effect */}
          {isActive && (
            <motion.div
              className="absolute -inset-1 rounded-xl opacity-20 blur-md"
              style={{
                background: 'linear-gradient(90deg, var(--accent-light), var(--accent), var(--accent-dark))',
                opacity: glowOpacity,
                boxShadow: '0 0 20px var(--accent)',
              }}
            />
          )}
          {/* Original gradient underline */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent-400 via-accent to-accent-600 transition-all duration-300 group-hover:w-full"
            initial={{ width: isActive ? "100%" : "0%" }}
            animate={{ width: isActive ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </a>
      </Link>
    </motion.div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [location]);

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg dark:shadow-accent/5"
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <a data-sidebar="menu-button" className="text-[1.75rem] font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 text-transparent bg-clip-text hover:scale-105 transition-transform">
                Portfolio
              </a>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {MENU_ITEMS.map(({ href, label }) => (
              <CursorAura key={href}>
                <MagneticLink
                  href={href}
                  isActive={location === href}
                >
                  {label}
                </MagneticLink>
              </CursorAura>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "close" : "menu"}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: isOpen ? 90 : 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="md:hidden overflow-hidden"
          >
            <div className={cn(
              "px-4 py-6 space-y-4",
              "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl",
              "border-t dark:border-gray-800"
            )}>
              {MENU_ITEMS.map(({ href, label }) => (
                <CursorAura key={href}>
                  <MagneticLink
                    href={href}
                    isActive={location === href}
                    onClick={() => setIsOpen(false)}
                  >
                    {label}
                  </MagneticLink>
                </CursorAura>
              ))}
              <div className="pt-4">
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

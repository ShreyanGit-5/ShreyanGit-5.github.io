import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'; // Keep icons
import { scaleVariants } from '../lib/animations'; // Keep animations if desired

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // IMPORTANT: Replace with your actual social links and email
  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    // Set background to cream, text color to dark for contrast
    <footer className="relative bg-cream text-dark-bg pt-12 pb-8 mt-16">
       {/* Optional: Add a subtle top border if desired */}
       {/* <div className="absolute top-0 left-0 right-0 h-px bg-ui-grey/20" /> */}

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8 items-start">
          {/* Brand/Logo Placeholder */}
          <div className="md:col-span-1">
             {/* You might want a dark version of your logo here */}
             <Link to="/" className="text-2xl font-bold text-electric-blue hover:opacity-80 transition-opacity">
              {/* Replace with Logo or Name */}
              Your Name/Logo
            </Link>
             <p className="mt-3 text-sm text-ui-grey"> {/* Darker text color */}
              Developer crafting digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-base font-semibold text-dark-bg mb-3">Navigate</h3> {/* Dark heading */}
            <ul className="space-y-1.5">
              {['Home', 'About Me', 'Projects', 'Contact'].map((item) => {
                 const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                 return (
                   <li key={item}>
                     <Link
                       to={path}
                       // Darker text, electric blue on hover
                       className="text-sm text-ui-grey hover:text-electric-blue transition-colors duration-200"
                     >
                       {item}
                     </Link>
                   </li>
                 );
              })}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-base font-semibold text-dark-bg mb-3">Connect</h3> {/* Dark heading */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  // Adjusted styling for cream background
                  className="p-2 rounded-full bg-dark-bg/5 text-ui-grey hover:text-electric-blue hover:bg-dark-bg/10 transition-all duration-200"
                  variants={scaleVariants} // Keep hover animation if desired
                  whileHover="hover"
                  whileTap="tap"
                  title={label}
                  aria-label={label}
                >
                  <Icon size={18} /> {/* Slightly smaller icons */}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-dark-bg/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-xs text-ui-grey/80"> {/* Darker, smaller text */}
              {/* IMPORTANT: Replace Your Name */}
              © {currentYear} Your Name. All rights reserved.
            </p>
             {/* Optional: Keep Privacy/Terms links if needed */}
            <div className="flex gap-4 text-xs text-ui-grey/80">
              <Link to="#" className="hover:text-electric-blue transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-electric-blue transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

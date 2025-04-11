import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { scaleVariants } from '../lib/animations';

interface SocialLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' },
  ];

  return (
    <footer className="relative mt-20">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 w-[1000px] h-[1000px] bg-[#2DB7FF] opacity-[0.07] blur-[150px] rounded-full transform -translate-x-1/2" />
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2DB7FF] to-[#8A2BE2]">
              SD
            </Link>
            <p className="mt-4 text-cream/70 max-w-xs">
              Crafting innovative digital experiences with modern technologies and creative design thinking.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold text-cream mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-lg font-semibold text-cream mb-4">Connect</h3>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cream/5 text-cream/70 hover:text-[#2DB7FF] 
                           hover:bg-cream/10 transition-all duration-300"
                  variants={scaleVariants}
                  whileHover="hover"
                  whileTap="tap"
                  title={label}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/50 text-sm">
              © {currentYear} Your Name. All rights reserved.
            </p>
            <div className="flex gap-4 text-cream/50 text-sm">
              <Link
                to="/privacy"
                className="hover:text-cream transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-cream transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
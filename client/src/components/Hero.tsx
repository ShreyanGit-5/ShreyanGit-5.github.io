import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInVariants } from '../lib/animations';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2DB7FF] opacity-[0.15] blur-[128px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8A2BE2] opacity-[0.15] blur-[128px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            variants={fadeInVariants}
            transition={{ delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2DB7FF] to-[#8A2BE2]">
              Creative Developer
            </span>
            <br />
            <span className="text-cream">Building Digital</span>
            <br />
            <span className="text-cream">Experiences</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-cream/80 max-w-2xl mx-auto mb-8"
            variants={fadeInVariants}
            transition={{ delay: 0.4 }}
          >
            Crafting innovative web solutions with modern technologies
            and creative design thinking.
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4"
            variants={fadeInVariants}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/projects"
              className="px-8 py-3 rounded-lg bg-[#2DB7FF] text-cream font-medium 
                hover:bg-[#2DB7FF]/90 transition-all duration-300 
                shadow-lg shadow-[#2DB7FF]/25 hover:shadow-[#2DB7FF]/50
                hover:scale-105 active:scale-95"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 rounded-lg bg-cream/10 text-cream font-medium 
                hover:bg-cream/20 transition-all duration-300
                backdrop-blur-sm border border-cream/20
                hover:scale-105 active:scale-95"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1,
          duration: 0.8,
          y: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-cream/30 p-1">
          <div className="w-1.5 h-1.5 bg-cream/50 rounded-full mx-auto" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
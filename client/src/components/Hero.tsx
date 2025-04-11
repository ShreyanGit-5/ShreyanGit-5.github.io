import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInVariants } from '../lib/animations'; // Assuming this provides basic fade-in

const Hero: React.FC = () => {
  // Hooks for parallax effect
  const { scrollYProgress } = useScroll();
  // Adjust the y-range for more subtle parallax
  const yBg1 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);


  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background gradient effects with Parallax */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Apply motion.div and style prop for parallax */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue opacity-[0.1] blur-[128px] rounded-full"
          style={{ y: yBg1 }} // Apply parallax transformation
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600 opacity-[0.1] blur-[128px] rounded-full" // Example secondary accent
           style={{ y: yBg2 }} // Apply parallax transformation
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center flex flex-col items-center" // Center content vertically and horizontally
          variants={fadeInVariants} // Use a generic fade-in
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }} // Stagger children animation
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance" // Added text-balance
            variants={fadeInVariants} // Child animation
          >
             {/* Use text-foreground for main text */}
            <span className="text-foreground block">Creative Developer</span>
            {/* Gradient accent can be applied selectively if desired */}
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-purple-500">
              Building Digital Experiences
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-secondary-text max-w-xl mx-auto mb-8" // Use secondary text color, adjusted max-width
            variants={fadeInVariants} // Child animation
          >
            Transforming ideas into polished, interactive web applications.
            Exploring my four-year journey in software development.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4" // Stack vertically on small screens
            variants={fadeInVariants} // Child animation
          >
            {/* Updated Button Styles */}
            <Link
              to="/projects"
              // Applied btn and btn-primary classes from index.css
              className="btn btn-primary w-full sm:w-auto"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
               // Applied btn and btn-secondary classes from index.css
              className="btn btn-secondary w-full sm:w-auto"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>

       {/* Optional: Keep or refine scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
         <motion.div 
          animate={{ y: [0, 8, 0] }} // Add subtle bounce animation
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
        >
          <div className="w-6 h-10 rounded-full border-2 border-secondary-text/50 flex justify-center items-start pt-1">
            <div className="w-1.5 h-1.5 bg-secondary-text/80 rounded-full" />
          </div>
         </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

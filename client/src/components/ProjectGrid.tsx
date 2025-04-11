import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard'; // Assuming ProjectCard handles its own animation
import { itemFadeInUp } from '../lib/animations'; // Or define variants locally

// --- Component Code ---

interface Project { // Ensure this interface matches actual project data structure
  id: string;
  title: string;
  description: string;
  image: string;
  // codePreview?: string; // Keep if used
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectGridProps {
  projects: Project[];
}

// Animation variant for the section title
const titleFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  // Removed containerVariants as each card will animate independently

  return (
    <section id="projects" className="relative py-24 px-4 overflow-hidden min-h-screen"> {/* Added ID and min-height */}
      {/* Background Effects - Keep or adjust */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-electric-blue opacity-[0.05] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-purple-600 opacity-[0.05] blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
         {/* Section Title */}
         <motion.div
           className="text-center mb-16"
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.5 }}
           variants={titleFadeInUp} // Use a simple fade-in for the title
         >
           <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
             Projects
           </h2>
           <p className="text-secondary-text text-lg max-w-2xl mx-auto">
             A selection of my work showcasing different technologies and solutions.
           </p>
         </motion.div>

        {/* Grid container - No complex variants needed now */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            // ProjectCard will handle its own whileInView animation
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </div>

      {/* Removed grid overlay effect if not desired, or keep */}
      {/* <div className="absolute inset-0 bg-[...] pointer-events-none" /> */}
    </section>
  );
};

export default ProjectGrid;

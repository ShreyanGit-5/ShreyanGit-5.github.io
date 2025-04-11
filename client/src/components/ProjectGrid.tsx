import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  codePreview?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#2DB7FF] opacity-[0.07] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-[#8A2BE2] opacity-[0.07] blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </motion.div>
      </div>

      {/* Grid overlay effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F0F14_1px,transparent_1px),linear-gradient(to_bottom,#0F0F14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
    </section>
  );
};

export default ProjectGrid;
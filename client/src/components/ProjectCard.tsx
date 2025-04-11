import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ExternalLink, Github } from 'lucide-react'; // Keep icons

// --- Animation Variants ---
const cardVariants = {
  hidden: { opacity: 0, y: 30 }, // Start slightly lower and faded out
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.6, // Adjust timing
    },
  },
};

// --- Component Code ---

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  // codePreview?: string; // Keep if used
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  // codePreview, // Keep if used
  technologies,
  liveUrl,
  githubUrl,
}) => {
  // Removed isHovered state
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="group relative rounded-xl bg-card border border-border/50 overflow-hidden shadow-md" // Use theme card styles
      variants={cardVariants} // Apply entrance animation variant
      initial="hidden"
      whileInView="visible" // Trigger animation on scroll
      viewport={{ once: true, amount: 0.2 }} // Trigger when 20% is visible
      whileHover={{
        scale: 1.03, // Subtle scale on hover
        // Add glow effect using boxShadow with the accent color
        boxShadow: `0 10px 25px -5px rgba(var(--color-electric-blue), 0.15), 0 8px 10px -6px rgba(var(--color-electric-blue), 0.1)`,
        transition: { duration: 0.3 }
      }}
      // Removed onHoverStart/End handlers
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-muted"> {/* Use aspect-video, muted bg for loading */}
        <img
          src={image}
          alt={`Screenshot of the ${title} project`} // Descriptive alt text
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${ 
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy" // Add lazy loading
        />
         {!imageLoaded && (
           <div className="absolute inset-0 bg-muted animate-pulse" /> // Skeleton loader
         )}
         {/* Optional: subtle gradient overlay on image */}
         {/* <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div> */}
      </div>

      {/* Content */}
      <div className="p-5"> {/* Slightly less padding */}
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-secondary-text mb-4 line-clamp-3"> {/* Smaller text, clamp lines */}
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4"> {/* Smaller gap */}
          {technologies.slice(0, 4).map((tech) => ( // Limit displayed techs
            <span
              key={tech}
              // Use theme accent color for tags
              className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/30 font-medium"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
             <span className="px-2 py-0.5 text-xs rounded-full bg-muted/50 text-secondary-text">
               +{technologies.length - 4} more
             </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 text-sm">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
               // Use theme link colors, electric blue on hover
              className="flex items-center gap-1.5 text-secondary-text hover:text-electric-blue transition-colors duration-200"
            >
              <ExternalLink size={16} /> {/* Smaller icon */}
              <span>Demo</span>
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
               // Use theme link colors, electric blue on hover
              className="flex items-center gap-1.5 text-secondary-text hover:text-electric-blue transition-colors duration-200"
            >
              <Github size={16} /> {/* Smaller icon */}
              <span>Code</span>
            </a>
          )}
          {/* Keep code preview button if used */}
          {/* {codePreview && ( ... )} */}
        </div>
      </div>

      {/* Removed extra motion.div for hover effects */}
    </motion.div>
  );
};

export default ProjectCard;

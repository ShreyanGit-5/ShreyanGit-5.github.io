import React from 'react';
import { motion } from 'framer-motion';
import AnimatedProjectCard from './AnimatedProjectCard';

// Enhanced project data with additional details for the modal
const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with product catalog, shopping cart, user authentication, and payment processing. Built with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    image: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=500&q=80',
    liveLink: 'https://example.com/ecommerce',
    repoLink: 'https://github.com/example/ecommerce',
    challenges: 'Implementing a secure and scalable shopping cart system was challenging. Handling product variants, inventory management, and ensuring a smooth checkout process required careful planning and execution.',
    solutions: 'We used Redux for state management, implemented JWT authentication, and designed a MongoDB schema that efficiently handled product variants and inventory tracking. The payment process was secured with Stripe integration.'
  },
  {
    id: 2,
    title: 'Personal Finance Dashboard',
    description: 'Interactive dashboard for tracking personal finances, with expense categorization, budget planning, and visual reports. Uses React, D3.js, and Firebase.',
    tags: ['React', 'D3.js', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=500&q=80',
    liveLink: 'https://example.com/finance',
    repoLink: 'https://github.com/example/finance',
    challenges: 'Creating intuitive visualizations for complex financial data and ensuring real-time updates while maintaining performance across devices presented significant challenges.',
    solutions: 'Leveraged D3.js for custom visualizations optimized for different screen sizes. Implemented Firebase real-time database with careful query structuring to minimize data transfer while keeping the UI responsive.'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, task assignments, and progress tracking. Built with Next.js, TypeScript, and Supabase.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1611224885990-ab7d7b4bf01e?auto=format&fit=crop&w=500&q=80',
    liveLink: 'https://example.com/tasks',
    repoLink: 'https://github.com/example/tasks',
    challenges: 'Building a real-time collaboration system that maintained data consistency across multiple users while ensuring a responsive user interface was particularly difficult.',
    solutions: 'Implemented Supabase real-time subscriptions with optimistic UI updates. Used TypeScript to enforce type safety and prevent bugs. Next.js server-side rendering improved initial load performance while maintaining real-time capabilities.'
  },
  {
    id: 4,
    title: 'Weather Forecast App',
    description: 'A sleek weather application that provides accurate forecasts, radar maps, and personalized alerts. Integrates with weather APIs and geolocation services.',
    tags: ['React', 'API Integration', 'Geolocation', 'PWA'],
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=500&q=80',
    liveLink: 'https://example.com/weather',
    repoLink: 'https://github.com/example/weather',
    challenges: 'Handling unreliable API responses, implementing accurate geolocation, and creating a smooth user experience with potentially slow network conditions were major challenges.',
    solutions: 'Implemented service workers for offline capabilities, used IndexedDB for caching weather data, and created fallback UI states for all API interactions. Added progressive enhancement to ensure core functionality worked even without JavaScript.'
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    description: 'Unified dashboard for managing multiple social media accounts, with scheduling, analytics, and content planning features. Built with Vue.js and GraphQL.',
    tags: ['Vue.js', 'GraphQL', 'Analytics', 'OAuth'],
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=500&q=80',
    liveLink: 'https://example.com/social',
    repoLink: 'https://github.com/example/social',
    challenges: 'Integrating with multiple social media APIs, each with different authentication methods and rate limits, while providing a unified interface was extremely complex.',
    solutions: 'Designed a GraphQL API that normalized data from various social platforms. Implemented a token refresh system for OAuth and a queuing system for API requests to prevent rate limit issues. Used Vue.js composition API for shared functionality across components.'
  },
  {
    id: 6,
    title: 'Recipe Sharing Platform',
    description: 'Community-driven recipe sharing platform with user ratings, comments, and customization options. Features a responsive design and offline capabilities.',
    tags: ['React', 'Firebase', 'PWA', 'Responsive Design'],
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=500&q=80',
    liveLink: 'https://example.com/recipes',
    repoLink: 'https://github.com/example/recipes',
    challenges: 'Creating a highly interactive recipe editor that supported complex formatting, ingredient scaling, and unit conversion while maintaining accessibility was challenging.',
    solutions: 'Built a custom React-based editor with semantic HTML structure. Implemented a robust conversion system for recipe measurements and created a responsive design system that adapted to different devices and screen orientations.'
  }
];

const ProjectGrid = () => {
  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 p-1 sm:p-2"
    >
      {projects.map((project) => (
        <AnimatedProjectCard
          key={project.id}
          project={project}
          className="h-full" // Ensure cards have equal height
        />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
import React from 'react';
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import NotFound from "@/pages/not-found";
import AnimatedSection from "./components/AnimatedSection";
import { ThemeProvider } from "./contexts/ThemeContext";

// Simple placeholder pages with animations
function Home() {
  // Use React.lazy for Hero component
  const HeroComponent = React.lazy(() => import('./components/Hero'));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <React.Suspense fallback={<div className="h-80 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">Loading hero...</div>}>
        <HeroComponent />
      </React.Suspense>
      
      <AnimatedSection className="container mx-auto px-4 md:px-6 py-16">
        <motion.h2 
          className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to My Portfolio
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          This is where I showcase my work and share my journey as a developer. Feel free to explore my projects and get in touch!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.button 
            className="px-6 py-3 rounded-lg font-medium text-white shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore My Work
          </motion.button>
        </motion.div>
      </AnimatedSection>
    </motion.div>
  );
}

function About() {
  // Import AboutSection at the top level to prevent import issues
  const AboutSection = React.lazy(() => import('./components/AboutSection'));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center text-gray-900 dark:text-gray-100">Loading about section...</div>}>
        <AboutSection 
          name="Jane Doe"
          title="Full Stack Developer & UI/UX Designer"
          bio={`I'm a passionate developer with over 5 years of experience building web applications and user interfaces. I specialize in creating responsive, accessible, and performant web experiences.

          My approach combines technical expertise with a keen eye for design, allowing me to build solutions that are both functional and visually appealing. I enjoy solving complex problems and continuously learning new technologies.`}
          skills={["JavaScript (ES6+)", "React", "Node.js", "TypeScript", "Tailwind CSS", "GraphQL", "Next.js", "MongoDB"]}
          experience={[
            { 
              title: "Senior Frontend Developer", 
              company: "Tech Innovations Inc.", 
              period: "2021 - Present", 
              description: "Lead developer for client web applications, focusing on performance optimization and accessibility."
            },
            { 
              title: "Web Developer", 
              company: "Digital Agency Group", 
              period: "2018 - 2021", 
              description: "Built responsive websites and web applications for various clients across different industries."
            }
          ]}
          education={[
            {
              degree: "M.S. Computer Science",
              institution: "University of Technology",
              year: "2018"
            },
            {
              degree: "B.S. Web Development",
              institution: "Digital Arts College",
              year: "2016"
            }
          ]}
        />
      </React.Suspense>
    </motion.div>
  );
}

function Projects() {
  // Import ProjectGrid at the top level to prevent import issues
  const ProjectGrid = React.lazy(() => import('./components/ProjectGrid'));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12"
    >
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedSection className="max-w-3xl mx-auto text-center mb-12">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Projects
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Here's a collection of my recent work. Each project represents my skills and passion for creating 
            intuitive, effective digital solutions.
          </motion.p>
        </AnimatedSection>
        
        <React.Suspense fallback={<div className="text-center text-gray-900 dark:text-gray-100">Loading projects...</div>}>
          <ProjectGrid />
        </React.Suspense>
      </div>
    </motion.div>
  );
}

function Contact() {
  // Import ContactSection at the top level to prevent import issues
  const ContactSection = React.lazy(() => import('./components/ContactSection'));
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center text-gray-900 dark:text-gray-100">Loading contact section...</div>}>
        <ContactSection />
      </React.Suspense>
    </motion.div>
  );
}

function Router() {
  // Get current route for AnimatePresence
  const [location] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-20 overflow-hidden flex-grow">
        <AnimatePresence mode="wait" initial={false}>
          <Switch location={location} key={location}>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
            <Route path="/contact" component={Contact} />
            {/* Fallback to 404 */}
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ScrollToTop />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
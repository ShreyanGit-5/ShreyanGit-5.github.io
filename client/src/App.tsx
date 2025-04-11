import React, { ReactNode } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom"; // BrowserRouter might not be needed here if already in main.tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { motion, AnimatePresence } from 'framer-motion';
// Removed: import { ThemeProvider } from './contexts/ThemeContext';
import { pageTransitionVariants } from './lib/animations';
import Navbar from './components/Navbar';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/not-found';

// Lazy load components
const Hero = React.lazy(() => import('./components/Hero.tsx'));
const AboutSection = React.lazy(() => import('./components/AboutSection.tsx'));
const ProjectGrid = React.lazy(() => import('./components/ProjectGrid'));
const ContactSection = React.lazy(() => import('./components/ContactSection.tsx'));

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => (
  <motion.div
    variants={pageTransitionVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

// Sample project data (Consider moving this to a separate file or fetching)
const projects = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS, featuring dark mode and smooth animations.",
    image: "/images/portfolio.png", // Ensure this path is correct
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#", // Replace with actual live URL
    githubUrl: "#" // Replace with actual GitHub URL
  },
  // ... other projects
];

function AppContent() {
  const location = useLocation();

  // Remove mouse movement tracking if grid-glow effect is removed or handled differently
  // React.useEffect(() => {
  //   const handleMouseMove = (e: MouseEvent) => {
  //     const x = (e.clientX / window.innerWidth) * 100;
  //     const y = (e.clientY / window.innerHeight) * 100;
  //     document.documentElement.style.setProperty('--mouse-x', `${x}%`);
  //     document.documentElement.style.setProperty('--mouse-y', `${y}%`);
  //   };
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  // Apply the noisy background class to the main div
  return (
    // Added bg-noisy class
    <div className="flex flex-col min-h-screen bg-noisy text-light-text overflow-x-hidden relative">
      {/* Remove grid background/glow if not desired or implement differently */}
      {/* <div className="grid-background" /> */}
      {/* <div className="grid-glow" /> */}

      <Navbar />
      {/* Add class for the gradient background */}
      <main className="pt-20 flex-grow isolate bg-dark-to-cream-gradient">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="h-screen flex items-center justify-center">Loading Home...</div>}>
                    <Hero />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading About...</div>}>
                    <AboutSection />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/projects"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading Projects...</div>}>
                    <ProjectGrid projects={projects} />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading Contact...</div>}>
                    <ContactSection />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      {/* Footer might need adjustments for the cream background transition */}
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    // Removed ThemeProvider wrapper
    <QueryClientProvider client={queryClient}>
        <AppContent />
        <ScrollToTop />
        <Toaster />
    </QueryClientProvider>
    // Removed ThemeProvider wrapper
  );
};

export default App;

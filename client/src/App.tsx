import React, { ReactNode } from 'react';
import { Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { pageTransitionVariants } from './lib/animations';
import Navbar from './components/Navbar';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/not-found';

// Lazy load components with .tsx extension
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

// Sample project data
const projects = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "A modern portfolio website built with React and Tailwind CSS, featuring dark mode and smooth animations.",
    image: "/images/portfolio.png",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/portfolio"
  },
  // ... other projects
];

function AppContent() {
  const location = useLocation();
  
  // Add mouse movement tracking
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-cream overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F0F14_1px,transparent_1px),linear-gradient(to_bottom,#0F0F14_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="grid-background" />
      <div className="grid-glow" />

      <Navbar />
      <main className="pt-20 overflow-hidden flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="h-80 bg-gray-800 flex items-center justify-center">Loading...</div>}>
                    <Hero />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/about"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
                    <AboutSection />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/projects"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="text-center">Loading...</div>}>
                    <ProjectGrid projects={projects} />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route
              path="/contact"
              element={
                <PageWrapper>
                  <React.Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
                    <ContactSection />
                  </React.Suspense>
                </PageWrapper>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppContent />
          <ScrollToTop />
          <Toaster />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;

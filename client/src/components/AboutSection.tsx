import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Server, Database, LucideIcon } from 'lucide-react';
// Removed fadeInVariants if not used elsewhere, define new ones here

// --- Animation Variants ---
const staggeredFadeInUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Adjust stagger timing
       when: "beforeChildren", // Animate container before children
    },
  },
};

const itemFadeInUp = {
  hidden: { opacity: 0, y: 20 }, // Start slightly lower
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring", // Optional: Use spring physics
      stiffness: 100,
      damping: 15,
      duration: 0.5, // Adjust duration
    },
  },
};

// --- Component Code ---

interface Skill {
  category: string;
  icon: LucideIcon;
  items: string[];
}

// IMPORTANT: Update skills if needed
const skills: Skill[] = [
  { category: 'Frontend', icon: Layout, items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', icon: Server, items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL'] },
  { category: 'Database', icon: Database, items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Prisma'] },
  { category: 'Other', icon: Code, items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Testing'] }
];

const AboutSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    // Added min-h-screen for consistent height, adjust padding
    <section id="about" className="relative min-h-screen py-24 px-4 overflow-hidden">
       {/* Background Effects - Keep or adjust as needed */}
       <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-electric-blue opacity-[0.05] blur-[150px] rounded-full" />
         <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-600 opacity-[0.05] blur-[150px] rounded-full" />
       </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Trigger when 50% visible
          variants={itemFadeInUp} // Animate title block
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About Me
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            {/* Update description */}
            A passionate developer focused on creating intuitive and performant web experiences over the last four years.
          </p>
        </motion.div>

        {/* Image and Bio Grid - Apply stagger container */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
          variants={staggeredFadeInUp} // Apply stagger container variant
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Trigger when 30% visible
        >
          {/* Profile Image */}
          <motion.div
            variants={itemFadeInUp} // Apply item animation variant
            className="relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-card" // Use card background
          >
             {/* IMPORTANT: Replace with your image path */}
            <img
              src="/your-image.jpg"
              alt="Profile Photo of [Your Name]" // Add descriptive alt text
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${ 
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy" // Add lazy loading
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" /> // Use muted bg for skeleton
            )}
            {/* Optional overlay */}
             {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={itemFadeInUp} // Apply item animation variant
            className="flex flex-col justify-center"
          >
             {/* IMPORTANT: Replace Your Name and X years */}
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Hello, I'm <span className="text-electric-blue">Your Name</span>
            </h3>
            <p className="text-secondary-text mb-4 leading-relaxed">
              With four years of experience in web development, I specialize in building
              modern, responsive, and user-friendly applications. My approach combines
              technical expertise with creative problem-solving to deliver exceptional
              digital experiences.
            </p>
            <p className="text-secondary-text mb-6 leading-relaxed">
              I'm passionate about staying up-to-date with the latest technologies
              and best practices, constantly learning and improving my skills
              to deliver impactful solutions.
            </p>
            <div className="flex gap-4">
               {/* IMPORTANT: Link to your actual resume */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                // Use theme button styles
                className="btn btn-primary"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Section Title - Apply animation */}
         <motion.div 
           className="mb-16" // Add margin below title
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.5 }}
           variants={itemFadeInUp}
         >
           <h3 className="text-3xl font-bold text-center text-foreground mb-10">My Skillset</h3>
         </motion.div>

        {/* Skills Grid - Apply stagger container */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggeredFadeInUp} // Apply stagger container variant
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger when 20% visible
        >
          {skills.map(({ category, icon: Icon, items }) => (
            <motion.div
              key={category}
              variants={itemFadeInUp} // Apply item animation variant
               // Use card styles, add hover effect
              className="p-6 rounded-xl bg-card shadow-md border border-border/50 group hover:border-electric-blue/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                 {/* Use accent color for icon */}
                <Icon className="text-electric-blue w-6 h-6" />
                <h4 className="text-lg font-semibold text-foreground">{category}</h4>
              </div>
              <ul className="space-y-1.5 text-sm">
                {items.map((item) => (
                  <li
                    key={item}
                     // Use secondary text color
                    className="text-secondary-text flex items-center gap-2"
                  >
                     {/* Subtle bullet point */}
                    <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

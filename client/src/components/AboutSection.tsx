import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Server, Database, LucideIcon } from 'lucide-react';
import { fadeInVariants } from '../lib/animations';

interface Skill {
  category: string;
  icon: LucideIcon;
  items: string[];
}

const skills: Skill[] = [
  {
    category: 'Frontend',
    icon: Layout,
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    icon: Server,
    items: ['Node.js', 'Express', 'Python', 'REST APIs', 'GraphQL']
  },
  {
    category: 'Database',
    icon: Database,
    items: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'Prisma']
  },
  {
    category: 'Other',
    icon: Code,
    items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Testing']
  }
];

const AboutSection: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  return (
    <section className="relative min-h-screen py-20 px-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#2DB7FF] opacity-[0.07] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#8A2BE2] opacity-[0.07] blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2DB7FF] to-[#8A2BE2]">
              About Me
            </span>
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            A passionate developer focused on creating intuitive and performant web experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Profile Image */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative aspect-square rounded-2xl overflow-hidden glass-effect"
          >
            <img
              src="/your-image.jpg"
              alt="Profile"
              className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 bg-cream/5 animate-pulse rounded-2xl" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold text-cream mb-4">
              Hello, I'm <span className="text-[#2DB7FF]">Your Name</span>
            </h3>
            <p className="text-cream/70 mb-6">
              With over X years of experience in web development, I specialize in building
              modern, responsive, and user-friendly applications. My approach combines
              technical expertise with creative problem-solving to deliver exceptional
              digital experiences.
            </p>
            <p className="text-cream/70 mb-6">
              I'm passionate about staying up-to-date with the latest technologies
              and best practices in web development, constantly learning and
              improving my skills to deliver the best possible solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-[#2DB7FF] text-cream font-medium 
                       hover:bg-[#2DB7FF]/90 transition-all duration-300 
                       shadow-lg shadow-[#2DB7FF]/25 hover:shadow-[#2DB7FF]/50
                       hover:scale-[1.02] active:scale-[0.98]"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map(({ category, icon: Icon, items }, index) => (
            <motion.div
              key={category}
              variants={fadeInVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl glass-effect group hover:bg-cream/5 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="text-[#2DB7FF] w-6 h-6" />
                <h4 className="text-lg font-semibold text-cream">{category}</h4>
              </div>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="text-cream/70 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2DB7FF]/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
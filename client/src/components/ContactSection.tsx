import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin } from 'lucide-react';
import { fadeInVariants } from '../lib/animations';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission logic
  };

  return (
    <section className="relative min-h-screen py-20 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 w-[1000px] h-[1000px] bg-[#2DB7FF] opacity-[0.07] blur-[150px] rounded-full transform -translate-x-1/2" />
        <div className="absolute -bottom-1/2 left-1/2 w-[1000px] h-[1000px] bg-[#8A2BE2] opacity-[0.07] blur-[150px] rounded-full transform -translate-x-1/2" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2DB7FF] to-[#8A2BE2]">
              Get in Touch
            </span>
          </h2>
          <p className="text-cream/70 text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 glass-effect rounded-2xl p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cream/90 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-cream/5 border border-cream/10 
                         text-cream placeholder-cream/30 focus:outline-none focus:border-[#2DB7FF]
                         transition-colors duration-300"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cream/90 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg bg-cream/5 border border-cream/10 
                         text-cream placeholder-cream/30 focus:outline-none focus:border-[#2DB7FF]
                         transition-colors duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-cream/90 mb-2">Message</label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full h-32 px-4 py-3 rounded-lg bg-cream/5 border border-cream/10 
                         text-cream placeholder-cream/30 focus:outline-none focus:border-[#2DB7FF]
                         transition-colors duration-300 resize-none"
                  placeholder="Your message"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full px-8 py-4 rounded-lg bg-[#2DB7FF] text-cream font-medium
                       hover:bg-[#2DB7FF]/90 transition-all duration-300
                       shadow-lg shadow-[#2DB7FF]/25 hover:shadow-[#2DB7FF]/50
                       flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-effect rounded-2xl p-6 sm:p-8 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-cream mb-6">Connect With Me</h3>
            <div className="space-y-6 flex-grow">
              <a
                href="mailto:your.email@example.com"
                className="flex items-center gap-4 text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>your.email@example.com</span>
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-cream/70 hover:text-[#2DB7FF] transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from './ui/button'; // Assuming you have Shadcn Button
import { Input } from './ui/input';   // Assuming you have Shadcn Input
import { Textarea } from './ui/textarea'; // Assuming you have Shadcn Textarea
import { useToast } from '../hooks/use-toast'; // Assuming useToast hook exists

// --- Animation Variants (reuse or define locally) ---
const titleFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggeredFadeInUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, when: "beforeChildren" },
  },
};

const itemFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.5 },
  },
};

// --- Component Code ---

interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast(); // Use toast for feedback

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // --- Placeholder Submission Logic ---
    // Replace with your actual form submission (e.g., API call)
    console.log("Form data:", formState);
    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Assume success
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default", // Or "success" if you have it
      });
      setFormState({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later or contact me directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
    // --- End Placeholder ---
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 overflow-hidden"> {/* Added ID */}
       {/* Animated Background Example (Subtle Gradient) */}
       <motion.div
         className="absolute inset-0 -z-10 overflow-hidden opacity-30"
         style={{
           backgroundImage: `radial-gradient(circle at 30% 70%, rgba(var(--color-electric-blue), 0.1), transparent 50%),
                           radial-gradient(circle at 70% 30%, rgba(138, 43, 226, 0.1), transparent 50%)`, // Use your accent colors (added purple example)
         }}
         animate={{
           backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"], // Move the gradient positions
         }}
         transition={{
           duration: 25, // Slow animation duration
           ease: "linear",
           repeat: Infinity,
         }}
       />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleFadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Get in Touch
          </h2>
          <p className="text-secondary-text text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat? Feel free to reach out!
          </p>
        </motion.div>

        {/* Form & Info Grid - Stagger Container */}
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={staggeredFadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Contact Form */}
          <motion.div
            variants={itemFadeInUp}
            className="md:col-span-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 sm:p-8 shadow-lg" // Use card styles
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name" // Add name attribute for accessibility/forms
                  value={formState.name}
                  onChange={(e) => setFormState(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your Name"
                  required
                  className="bg-input border-border placeholder:text-muted-foreground focus:border-primary" // Themed input
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={(e) => setFormState(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  required
                   className="bg-input border-border placeholder:text-muted-foreground focus:border-primary" // Themed input
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="How can I help you?"
                  required
                  rows={5} // Adjust rows
                   className="bg-input border-border placeholder:text-muted-foreground focus:border-primary resize-none" // Themed textarea
                />
              </div>
              <Button
                type="submit"
                className="w-full btn btn-primary" // Use primary button style
                disabled={isSubmitting} // Disable while submitting
              >
                {isSubmitting ? (
                  <>
                    {/* Add a simple loading spinner */}
                    <motion.div
                      className="w-4 h-4 border-2 border-transparent border-t-current rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> {/* Smaller icon */}
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={itemFadeInUp}
             // Use card styles
            className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 sm:p-8 flex flex-col"
          >
            <h3 className="text-xl font-semibold text-foreground mb-5">Direct Contact</h3>
            <div className="space-y-4 flex-grow">
               {/* IMPORTANT: Replace placeholders */}
              <a
                href="mailto:your.email@example.com"
                 // Themed link styles
                className="flex items-center gap-3 text-secondary-text hover:text-primary transition-colors duration-200 group"
              >
                <Mail className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="text-sm">your.email@example.com</span>
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-secondary-text hover:text-primary transition-colors duration-200 group"
              >
                <Github className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="text-sm">GitHub Profile</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-secondary-text hover:text-primary transition-colors duration-200 group"
              >
                <Linkedin className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                <span className="text-sm">LinkedIn Profile</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

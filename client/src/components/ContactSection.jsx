import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Linkedin, Github, Mail } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    errorMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Please enter your name.'
      }));
      return false;
    }
    
    if (!formData.email.trim()) {
      setFormState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Please enter your email address.'
      }));
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Please enter a valid email address.'
      }));
      return false;
    }
    
    if (!formData.message.trim()) {
      setFormState(prev => ({
        ...prev,
        isError: true,
        errorMessage: 'Please enter your message.'
      }));
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error state
    setFormState(prev => ({
      ...prev,
      isError: false,
      errorMessage: ''
    }));
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Set submitting state
    setFormState(prev => ({
      ...prev,
      isSubmitting: true
    }));
    
    try {
      // Simulate form submission with a timeout
      // In a real implementation, you would replace this with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Set success state
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        errorMessage: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          isSubmitted: false
        }));
      }, 5000);
      
    } catch (error) {
      // Handle error
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        errorMessage: 'There was an error sending your message. Please try again.'
      });
    }
  };
  
  // Social media links
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/',
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: 'GitHub',
      url: 'https://github.com/',
      icon: <Github className="w-5 h-5" />
    },
    {
      name: 'Email',
      url: 'mailto:contact@example.com',
      icon: <Mail className="w-5 h-5" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12">
      <motion.div 
        className="text-center mb-8 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient">
          Get In Touch
        </h1>
        <motion.p 
          className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md sm:max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Have a question or want to work together? Fill out the form below or reach out through social media.
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">Send Me a Message</h2>
          
          {formState.isSubmitted && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 flex items-center">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <p className="text-sm sm:text-base">Thank you for your message! I'll get back to you as soon as possible.</p>
            </div>
          )}
          
          {formState.isError && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 flex items-center">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              <p className="text-sm sm:text-base">{formState.errorMessage}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md 
                  hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-all duration-300 
                  transform focus:translate-x-1"
                  placeholder="Your name"
                  disabled={formState.isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group">
                  Email <span className="text-red-500 transition-opacity duration-300 group-focus-within:opacity-100 opacity-0">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md 
                  hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-all duration-300 
                  transform focus:translate-x-1"
                  placeholder="your.email@example.com"
                  disabled={formState.isSubmitting}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 group">
                  Message <span className="text-red-500 transition-opacity duration-300 group-focus-within:opacity-100 opacity-0">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-md 
                  hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-700 
                  text-gray-900 dark:text-gray-100 text-sm sm:text-base transition-all duration-300 
                  resize-none"
                  placeholder="Your message here..."
                  disabled={formState.isSubmitting}
                ></textarea>
              </div>
              
              <motion.button
                type="submit"
                disabled={formState.isSubmitting}
                className={`w-full flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-white transition-all duration-300 text-sm sm:text-base shadow-md ${
                  formState.isSubmitting 
                    ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed' 
                    : 'hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
                style={{
                  backgroundImage: formState.isSubmitting 
                    ? 'none' 
                    : 'linear-gradient(to right, #3182ce, #6366f1)'
                }}
                whileHover={{
                  backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)',
                  boxShadow: '0 10px 15px -3px rgba(149, 76, 233, 0.3), 0 4px 6px -2px rgba(149, 76, 233, 0.2)'
                }}
                whileTap={{ scale: 0.95 }}
                variants={{
                  hover: {
                    scale: 1.05,
                    boxShadow: '0 10px 15px -3px rgba(149, 76, 233, 0.3), 0 4px 6px -4px rgba(149, 76, 233, 0.2)',
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 15
                    }
                  }
                }}
              >
                {formState.isSubmitting ? (
                  <>
                    <svg className="animate-spin mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="flex items-center"
                    >
                      <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                      <span>Get in Touch</span>
                    </motion.span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>
        
        {/* Social Media Links */}
        <div>
          {/* Enhanced Social Media Links */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-700">
            <motion.h2 
              className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent animate-gradient mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Connect With Me
            </motion.h2>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((link, index) => {
                // Customize colors based on link type
                let gradientColors;
                let shadowColor;
                
                if (link.name === 'LinkedIn') {
                  gradientColors = "from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300";
                  shadowColor = "rgba(37, 99, 235, 0.7)";
                } else if (link.name === 'GitHub') {
                  gradientColors = "from-gray-800 to-gray-600 dark:from-gray-700 dark:to-gray-500";
                  shadowColor = "rgba(75, 85, 99, 0.7)";
                } else if (link.name === 'Email') {
                  gradientColors = "from-purple-600 to-purple-400 dark:from-purple-500 dark:to-purple-300";
                  shadowColor = "rgba(147, 51, 234, 0.7)";
                }
                
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with me on ${link.name}`}
                    className="group relative flex flex-col items-center justify-center"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <div className="relative">
                      {/* Pulsing background effect on hover */}
                      <motion.div 
                        className={`absolute inset-0 rounded-full opacity-0 bg-gradient-to-r ${gradientColors} blur-xl group-hover:opacity-40 transition-opacity duration-500`}
                        initial={{ scale: 0.8 }}
                        whileHover={{ 
                          scale: 1.5,
                          opacity: 0.4,
                          transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
                        }}
                      />
                      
                      {/* Main icon container */}
                      <motion.div 
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${gradientColors} text-white flex items-center justify-center shadow-lg z-10 relative`}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: `0 0 20px ${shadowColor}`,
                          rotate: [0, -5, 5, -5, 0],
                          transition: { 
                            rotate: {
                              duration: 0.5,
                              ease: "easeInOut"
                            },
                            scale: {
                              type: "spring",
                              stiffness: 400,
                              damping: 10
                            }
                          }
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ 
                            scale: [1, 1.2, 1],
                            transition: { 
                              duration: 0.6,
                              ease: "easeInOut"
                            }
                          }}
                        >
                          {link.icon}
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Label with underline animation */}
                    <div className="mt-3 text-center">
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{link.name}</span>
                      <motion.div 
                        className="h-0.5 w-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mx-auto mt-1 rounded-full"
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
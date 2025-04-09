import { useEffect, useState, useRef } from 'react';

/**
 * A custom hook that detects when an element comes into view during scrolling
 * and triggers animations accordingly
 * 
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - A number between 0 and 1 indicating the percentage of the element that should be visible
 * @param {string} options.root - The element that is used as the viewport for checking visibility
 * @param {string} options.rootMargin - Margin around the root element
 * @returns {Array} - [reference to the element, boolean indicating if element is in view]
 */
const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once the animation is triggered, we can unobserve the element
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1, // Default to 10% visibility
    });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options.root, options.rootMargin, options.threshold]);
  
  return [ref, isVisible];
};

export default useScrollAnimation;
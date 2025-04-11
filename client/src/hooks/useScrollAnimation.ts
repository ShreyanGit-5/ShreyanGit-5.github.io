import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

type ScrollAnimationReturn = [RefObject<HTMLElement>, boolean];

/**
 * A custom hook that detects when an element comes into view during scrolling
 * and triggers animations accordingly
 * 
 * @param options - Intersection Observer options
 * @param options.threshold - A number between 0 and 1 indicating the percentage of the element that should be visible
 * @param options.root - The element that is used as the viewport for checking visibility
 * @param options.rootMargin - Margin around the root element
 * @returns [reference to the element, boolean indicating if element is in view]
 */
const useScrollAnimation = (options: ScrollAnimationOptions = {}): ScrollAnimationReturn => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once the animation is triggered, we can unobserve the element
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      root: options.root ?? null,
      rootMargin: options.rootMargin ?? '0px',
      threshold: options.threshold ?? 0.1, // Default to 10% visibility
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
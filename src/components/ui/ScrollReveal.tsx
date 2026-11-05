import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade';
  delay?: number; // delay in ms
  duration?: number; // duration in ms
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Fallback if IntersectionObserver is unsupported
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Initial and visible transform/opacity states
  const getInitialClass = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-7';
      case 'fade-down':
        return 'opacity-0 -translate-y-7';
      case 'fade-left':
        return 'opacity-0 -translate-x-7';
      case 'fade-right':
        return 'opacity-0 translate-x-7';
      case 'zoom-in':
        return 'opacity-0 scale-95';
      case 'fade':
      default:
        return 'opacity-0';
    }
  };

  const getVisibleClass = () => {
    switch (animation) {
      case 'fade-up':
      case 'fade-down':
        return 'opacity-100 translate-y-0';
      case 'fade-left':
      case 'fade-right':
        return 'opacity-100 translate-x-0';
      case 'zoom-in':
        return 'opacity-100 scale-100';
      case 'fade':
      default:
        return 'opacity-100';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ${isVisible ? getVisibleClass() : getInitialClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isVisible ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};


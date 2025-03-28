"use client";

import { useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  baseOpacity?: number;
  enableBlur?: boolean;
  baseRotation?: number;
  blurStrength?: number;
  className?: string;
  textClassName?: string;
  threshold?: number;
  once?: boolean;
}

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.6,
  baseOpacity = 0.1,
  enableBlur = true,
  baseRotation = 3,
  blurStrength = 4,
  className = "",
  textClassName = "",
  threshold = 0.3,
  once = true
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once, amount: threshold });
  const controls = useAnimation();

  // Handle rendering differently based on children type
  const content = useMemo(() => {
    if (typeof children !== 'string') {
      // If not a string, just return the children directly
      return (
        <motion.div
          variants={{
            hidden: { 
              opacity: baseOpacity, 
              y: 10,
              filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: {
                delay,
                duration,
                ease: [0.16, 1, 0.3, 1]
              }
            }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {children}
        </motion.div>
      );
    }

    // For strings, wrap the entire content in a single motion div with normal word-wrap behavior
    return (
      <motion.div
        variants={{
          hidden: { 
            opacity: baseOpacity, 
            y: 10,
            filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
          },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1]
            }
          }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="break-normal whitespace-normal"
      >
        {children}
      </motion.div>
    );
  }, [children, isInView, baseOpacity, baseRotation, enableBlur, blurStrength, delay, duration]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div 
      ref={containerRef} 
      className={`overflow-visible ${className}`}
    >
      <div className={`${textClassName} whitespace-normal break-words`}>
        {content}
      </div>
    </div>
  );
};

export default ScrollReveal;

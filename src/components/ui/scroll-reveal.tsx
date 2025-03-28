
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

  // Split text into words if it's a string
  const splitText = useMemo(() => {
    if (typeof children !== 'string') return children;
    
    return children.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <motion.span 
          className="inline-block"
          key={index}
          variants={{
            hidden: { 
              opacity: baseOpacity, 
              rotateZ: baseRotation,
              filter: enableBlur ? `blur(${blurStrength}px)` : 'none',
            },
            visible: (i: number) => ({
              opacity: 1,
              rotateZ: 0,
              filter: 'blur(0px)',
              transition: {
                delay: delay + i * 0.05,
                duration,
                ease: [0.16, 1, 0.3, 1]
              }
            })
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={index}
        >
          {word}
        </motion.span>
      );
    });
  }, [children, isInView, baseOpacity, baseRotation, enableBlur, blurStrength, delay, duration]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div 
      ref={containerRef} 
      className={`overflow-hidden ${className}`}
    >
      <div className={`${textClassName}`}>
        {splitText}
      </div>
    </div>
  );
};

export default ScrollReveal;

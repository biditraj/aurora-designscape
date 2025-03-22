
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import './Carousel.css';
import { Code, Palette, Zap, Layers, Github, Star } from 'lucide-react';

interface CarouselProps {
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const Carousel = ({
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
  round = false,
}: CarouselProps) => {
  const skills = [
    {
      icon: <Code className="carousel-icon" />,
      title: "React",
      description: "Modern, efficient UI development"
    },
    {
      icon: <Palette className="carousel-icon" />,
      title: "UI/UX Design",
      description: "Intuitive and engaging interfaces"
    },
    {
      icon: <Github className="carousel-icon" />,
      title: "TypeScript",
      description: "Type-safe JavaScript development"
    },
    {
      icon: <Zap className="carousel-icon" />,
      title: "JavaScript",
      description: "Dynamic, interactive web functionality"
    },
    {
      icon: <Layers className="carousel-icon" />,
      title: "Tailwind CSS",
      description: "Utility-first CSS framework"
    },
    {
      icon: <Star className="carousel-icon" />,
      title: "Framer Motion",
      description: "Powerful animation library"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();

  const computedWidth = baseWidth;
  
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = computedWidth;
        const maxIndex = skills.length - Math.floor(containerWidth / itemWidth);
        
        if (current > maxIndex) {
          setCurrent(maxIndex < 0 ? 0 : maxIndex);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [baseWidth, computedWidth, current, skills.length]);

  useEffect(() => {
    if (trackRef.current && containerRef.current) {
      const scrollAmount = current * computedWidth;
      controls.start({
        x: -scrollAmount,
        transition: { duration: 0.5, ease: "easeInOut" }
      });
    }
  }, [current, computedWidth, controls]);

  useEffect(() => {
    const startAutoplay = () => {
      if (autoplay && !isDragging) {
        autoplayTimeoutRef.current = setTimeout(() => {
          const newIndex = loop
            ? (current + 1) % skills.length
            : Math.min(current + 1, skills.length - 1);
          
          setCurrent(newIndex);
          startAutoplay();
        }, autoplayDelay);
      }
    };

    if (autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
    }

    startAutoplay();

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [autoplay, autoplayDelay, current, isDragging, loop, skills.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    if (trackRef.current) {
      setStartScrollLeft(trackRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    if (trackRef.current) {
      const x = e.pageX;
      const walk = (x - startX) * 2;
      trackRef.current.scrollLeft = startScrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    if (trackRef.current) {
      setStartScrollLeft(trackRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    if (trackRef.current) {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 2;
      trackRef.current.scrollLeft = startScrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover && autoplayTimeoutRef.current) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  };

  const handleMouseExit = () => {
    if (pauseOnHover && autoplay) {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
      
      autoplayTimeoutRef.current = setTimeout(() => {
        const newIndex = loop
          ? (current + 1) % skills.length
          : Math.min(current + 1, skills.length - 1);
        
        setCurrent(newIndex);
      }, autoplayDelay);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrent(index);
  };

  return (
    <div 
      className={`carousel-container ${round ? 'round' : ''} glass-card`}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseExit}
    >
      <motion.div 
        className="carousel-track"
        ref={trackRef}
        animate={controls}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`carousel-item ${round ? 'round' : ''}`}
              style={{ 
                width: computedWidth,
                marginRight: index === skills.length - 1 ? 0 : 20,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`carousel-item-header ${round ? 'round' : ''}`}>
                <div className="carousel-icon-container">
                  {skill.icon}
                </div>
              </div>
              <div className="carousel-item-content">
                <div className="carousel-item-title">{skill.title}</div>
                <div className="carousel-item-description">{skill.description}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {skills.length > 1 && (
        <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
          <div className="carousel-indicators">
            {skills.map((_, index) => (
              <div
                key={index}
                className={`carousel-indicator ${current === index ? 'active' : 'inactive'}`}
                onClick={() => handleIndicatorClick(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;

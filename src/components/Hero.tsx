
import { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import VariableProximity from './VariableProximity';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start('visible');
    
    // Setup scroll animation for the explore indicator
    const handleScroll = () => {
      if (window.scrollY > 100) {
        document.querySelector('.scroll-indicator')?.classList.add('opacity-0');
      } else {
        document.querySelector('.scroll-indicator')?.classList.remove('opacity-0');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return (
    <section id="hero" className="scroll-section flex items-center justify-center pt-20 relative overflow-hidden">
      <div 
        ref={containerRef} 
        className="container mx-auto px-6 py-16 md:py-32 flex flex-col items-center text-center min-h-screen justify-center"
      >
        <motion.div 
          className="stagger-animation flex flex-col items-center max-w-4xl"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          <motion.span 
            className="tag mb-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            UI/UX Designer & Front-End Developer
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <VariableProximity
              label="Crafting Digital Experiences with Precision"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 800, 'opsz' 40"
              containerRef={containerRef}
              radius={150}
              falloff="exponential"
              className="variable-proximity-title"
            />
          </motion.h1>
          
          <motion.div
            className="overflow-hidden w-full max-w-2xl mb-10"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground typing-text"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 2 }}
            >
              I transform complex problems into elegant, intuitive designs.
            </motion.p>
            <p className="text-lg md:text-xl text-muted-foreground mt-2">
              Let's build something amazing together.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 items-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <a href="#projects" className="btn-primary">
              View My Projects
            </a>
            <a href="#about" className="btn-outline flex items-center gap-2 group">
              About Me
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator transition-opacity duration-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center">
            <div className="mouse-wheel"></div>
            <span className="scroll-indicator-text">Scroll to explore</span>
            <div className="scroll-indicator-line"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

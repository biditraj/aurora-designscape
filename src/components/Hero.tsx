
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import VariableProximity from './VariableProximity';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className="scroll-section flex items-center justify-center pt-20 relative overflow-hidden">
      <div 
        ref={containerRef} 
        className="container mx-auto px-6 py-16 md:py-32 flex flex-col items-center text-center"
      >
        <div className="stagger-animation flex flex-col items-center max-w-4xl">
          <span className="tag mb-4">UI/UX Designer & Front-End Developer</span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <VariableProximity
              label="Crafting Digital Experiences with Precision"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 800, 'opsz' 40"
              containerRef={containerRef}
              radius={150}
              falloff="exponential"
              className="variable-proximity-title"
            />
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
            I transform complex problems into elegant, intuitive designs that elevate the user experience.
            Let's build something amazing together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a href="#projects" className="btn-primary">
              View My Projects
            </a>
            <a href="#about" className="btn-outline flex items-center gap-2 group">
              About Me
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-foreground/50"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

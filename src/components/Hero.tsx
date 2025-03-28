import { useRef } from 'react';
import { motion } from 'framer-motion';
import VariableProximity from './VariableProximity';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="hero" className="scroll-section flex items-center justify-center relative overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6 md:py-20 flex flex-col items-center text-center min-h-screen justify-center my-[24px] py-[49px]">
        <motion.div 
          className="stagger-animation flex flex-col items-center max-w-4xl" 
          initial="hidden" 
          animate="visible" 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gradient playfair-display-bold" 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }
              }
            }}
          >
            <VariableProximity 
              label="Bidit Raj" 
              fromFontVariationSettings="'wght' 400, 'opsz' 9" 
              toFontVariationSettings="'wght' 800, 'opsz' 40" 
              containerRef={containerRef} 
              radius={150} 
              falloff="exponential" 
              className="variable-proximity-title playfair-display" 
            />
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 playfair-display-medium" 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }
              }
            }}
          >
            <VariableProximity 
              label="Crafting Digital Experiences with Precision" 
              fromFontVariationSettings="'wght' 400, 'opsz' 9" 
              toFontVariationSettings="'wght' 800, 'opsz' 40" 
              containerRef={containerRef} 
              radius={150} 
              falloff="exponential" 
              className="variable-proximity-title playfair-display" 
            />
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
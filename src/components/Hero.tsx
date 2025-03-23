
import { useRef } from 'react';
import { motion } from 'framer-motion';
import VariableProximity from './VariableProximity';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section id="hero" className="scroll-section flex items-center justify-center relative overflow-hidden">
      <div 
        ref={containerRef} 
        className="container mx-auto px-6 py-16 md:py-28 flex flex-col items-center text-center min-h-screen justify-center"
      >
        <motion.div 
          className="stagger-animation flex flex-col items-center max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
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
            className="mb-8 overflow-hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Bidit Raj
            </motion.h2>
          </motion.div>
          
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

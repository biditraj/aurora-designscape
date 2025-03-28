
import { useRef } from 'react';
import { motion } from 'framer-motion';
import VariableProximity from './VariableProximity';
import ScrollReveal from './ScrollReveal';

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
          
          <motion.div 
            className="mb-10"
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
            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={5}
              blurStrength={6}
              scrollContainerRef={containerRef}
              containerClassName="playfair-display-medium mt-6 mb-8"
              textClassName="text-3xl md:text-4xl lg:text-5xl"
            >
              Crafting Digital Experiences with Precision
            </ScrollReveal>
          </motion.div>
          
          <motion.div 
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
            className="max-w-3xl mx-auto mt-8"
          >
            <ScrollReveal 
              baseOpacity={0}
              enableBlur={true}
              baseRotation={3}
              blurStrength={4}
              scrollContainerRef={containerRef}
              containerClassName="text-foreground/80"
              textClassName="text-lg md:text-xl"
            >
              When does a man die? When he is hit by a bullet? No! When he suffers a disease?
              No! When he ate a soup made out of a poisonous mushroom?
              No! A man dies when he is forgotten!
            </ScrollReveal>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

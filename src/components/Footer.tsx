
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { useRef } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer ref={footerRef} className="py-8 text-center">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ScrollReveal 
          baseOpacity={0}
          enableBlur={true}
          baseRotation={2}
          blurStrength={3}
          scrollContainerRef={footerRef}
          containerClassName=""
          textClassName="text-sm text-muted-foreground"
        >
          © {currentYear} Bidit Raj. All rights reserved.
        </ScrollReveal>
      </motion.div>
    </footer>
  );
};

export default Footer;

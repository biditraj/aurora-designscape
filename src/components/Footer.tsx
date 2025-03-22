
import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative py-10">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md z-0"></div>
      <div 
        ref={containerRef}
        className="container mx-auto px-6 relative z-10"
      >
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-2xl font-bold font-display">
              <span className="text-gradient">Bidit</span> <span className="text-foreground">Raj</span>
            </a>
            <p className="text-muted-foreground mt-2">UI/UX Designer & Front-End Developer</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12">
            <nav>
              <ul className="flex items-center gap-6">
                <li><a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
                <li><a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </nav>
            
            <div className="flex gap-4">
              {['twitter', 'github', 'dribbble', 'linkedin'].map((platform) => (
                <a 
                  key={platform}
                  href="#"
                  className="glass-card w-10 h-10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label={`Visit ${platform}`}
                >
                  <img 
                    src={`https://simpleicons.org/icons/${platform}.svg`} 
                    alt={platform} 
                    className="w-5 h-5 invert opacity-75 hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bidit Raj. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 glass-card p-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

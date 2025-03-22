
import { useRef } from 'react';
import { ArrowUp } from 'lucide-react';

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
    <footer className="bg-muted py-10 relative">
      <div 
        ref={containerRef}
        className="container mx-auto px-6"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-2xl font-bold">
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
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
        </div>
        
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bidit Raj. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <button
              onClick={scrollToTop}
              className="p-3 glass-card rounded-full hover:bg-white/10 transition-all duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

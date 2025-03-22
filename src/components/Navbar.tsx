
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far the user has scrolled
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;
      const totalDocScrollLength = docHeight - winHeight;
      const scrollProgress = Math.min(scrollY / 200, 1); // Max out at 200px scroll
      
      setScrollProgress(scrollProgress);
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const navHeight = isScrolled ? 'py-2' : 'py-5';
  const navBackground = isScrolled ? 'glass-nav' : 'bg-transparent';
  const scale = 1 + scrollProgress * 0.02; // Subtle scale effect as user scrolls

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBackground}`}
    >
      <div className="container mx-auto px-6">
        <div 
          className={`flex justify-between items-center transition-all duration-300 ${navHeight}`}
          style={{ transform: `scale(${scale})` }}
        >
          <a href="#hero" className="text-2xl font-bold relative z-20 font-display">
            <span className="text-gradient">Bidit</span> <span className="text-foreground">Raj</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="nav-link font-medium">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" className="btn-primary">
                  Say Hello
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="block md:hidden relative z-20 text-foreground"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 bg-background/60 flex flex-col items-center justify-center z-10"
              >
                <motion.nav
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <ul className="flex flex-col items-center gap-8 text-xl">
                    {navLinks.map((link, index) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                      >
                        <a
                          href={link.href}
                          className="nav-link text-foreground hover:text-primary transition-colors duration-300 font-medium"
                          onClick={closeMobileMenu}
                        >
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                    <motion.li
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <a
                        href="#contact"
                        className="btn-primary mt-4"
                        onClick={closeMobileMenu}
                      >
                        Say Hello
                      </a>
                    </motion.li>
                  </ul>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;

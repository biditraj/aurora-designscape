
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-background/70 py-3' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold relative z-20">
          <span className="text-gradient">Bidit</span> <span className="text-foreground">Raj</span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-lg flex flex-col items-center justify-center z-10"
            >
              <nav>
                <ul className="flex flex-col items-center gap-8 text-xl">
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <a
                        href={link.href}
                        className="nav-link text-foreground hover:text-primary transition-colors duration-300"
                        onClick={closeMobileMenu}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
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
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;

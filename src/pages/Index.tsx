
import { useRef, useState, useEffect } from 'react';
import { SplashCursor } from '@/components/ui/splash-cursor';
import Aurora from '@/components/Aurora';
import Hero from '@/components/Hero';
import BioSection from '@/components/BioSection';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomSidebar } from '@/components/ui/custom-sidebar';
import Navbar from '@/components/Navbar';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
  // Check if the device is desktop (screen width > 768px)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    
    // Initial check
    checkDesktop();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkDesktop);
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen relative"
        style={{ position: 'relative' }} // Fix for framer-motion scroll offset warning
      >
        <Aurora 
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        
        {/* Only render SplashCursor on desktop */}
        {isDesktop && <SplashCursor />}
        
        {/* Add Navbar to make login/signup links visible */}
        <Navbar />
        
        {/* New sidebar navigation */}
        <CustomSidebar />
        
        {/* Main content with proper padding */}
        <div className="md:pl-16 pb-24 md:pb-0">
          <Hero />
          <BioSection />
          <Projects />
          <Contact />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;


import { useRef } from 'react';
import { SplashCursor } from '@/components/ui/splash-cursor';
import Aurora from '@/components/Aurora';
import Hero from '@/components/Hero';
import BioSection from '@/components/BioSection';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { motion, AnimatePresence } from 'framer-motion';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { Home, User, Briefcase, MessageSquare } from 'lucide-react';

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const navItems = [
    { name: 'Home', url: '#hero', icon: Home },
    { name: 'Bio', url: '#bio', icon: User },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Contact', url: '#contact', icon: MessageSquare }
  ];

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
        
        <SplashCursor />
        
        <NavBar items={navItems} />
        <Hero />
        <BioSection />
        <Projects />
        <Contact />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;

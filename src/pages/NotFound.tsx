
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Aurora from '@/components/Aurora';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Aurora 
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.3}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card p-10 max-w-md text-center z-10"
      >
        <span className="tag mb-4">Error 404</span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Page <span className="text-gradient">Not Found</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Return Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

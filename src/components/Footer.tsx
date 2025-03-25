
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-4 text-center">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-muted-foreground">
          © {currentYear} Bidit Raj. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;

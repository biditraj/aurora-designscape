
import React from 'react';
import LoadingAnimation from './LoadingAnimation';
import { motion } from 'framer-motion';

interface FullScreenLoaderProps {
  isLoading: boolean;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingAnimation width={250} height={250} />
      <p className="mt-4 text-xl font-medium text-white">Aurora DesignScape</p>
    </motion.div>
  );
};

export default FullScreenLoader;

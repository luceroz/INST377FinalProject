import React from 'react';
import { motion } from 'framer-motion';

function LoadingSpinner() {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.p>
    </div>
  );
}

export default LoadingSpinner;

import React, { memo } from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = memo(() => {
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const dotVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-white"
      role="status"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="relative w-12 h-12"
          variants={spinnerVariants}
          animate="animate"
        >
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-blue-500" />
        </motion.div>

        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-blue-500"
              variants={dotVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>

        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  theme: 'light' | 'dark';
}

const Hero = memo<HeroProps>(({ theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      className={`relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}
      aria-label="Hero section"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Modern Web Application
            </span>
          </motion.h2>

          <motion.p
            className={`text-lg sm:text-xl mb-8 max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
            variants={itemVariants}
          >
            Built with React, TypeScript, Tailwind CSS - featuring complete accessibility compliance, performance optimization, and modern UX patterns.
          </motion.p>

          <motion.button
            className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Get started with the modern web application"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
        aria-hidden="true"
      />
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;

import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  theme: 'light' | 'dark';
}

const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Performance Optimized',
    description: 'Code splitting, lazy loading, and Core Web Vitals optimization for lightning-fast loading',
  },
  {
    icon: '♿',
    title: 'Fully Accessible',
    description: 'WCAG 2.1 AA compliant with semantic HTML, ARIA labels, and keyboard navigation',
  },
  {
    icon: '🎨',
    title: 'Modern UI/UX',
    description: 'Responsive design with smooth animations and delightful interactions',
  },
  {
    icon: '🧪',
    title: 'Well Tested',
    description: 'Jest and Testing Library with high coverage for reliability and confidence',
  },
  {
    icon: '📱',
    title: 'Mobile First',
    description: 'Optimized for all devices with responsive layouts and touch-friendly interactions',
  },
  {
    icon: '🔒',
    title: 'Type Safe',
    description: 'Full TypeScript support for better developer experience and fewer runtime errors',
  },
];

const Features = memo<FeaturesProps>(({ theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-white'
      }`}
      aria-label="Features"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Why Choose This App?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.article
              key={`${feature.title}-${index}`}
              className={`p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-50 hover:bg-white'
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p
                className={
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }
              >
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;

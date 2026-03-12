import React, { Suspense, memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DataTable from './components/DataTable';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

const App = memo(() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleThemeToggle = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-900'
      }`}
      role="application"
    >
      {/* Accessibility: Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-500 focus:text-white"
      >
        Skip to main content
      </a>

      <Header onThemeToggle={handleThemeToggle} theme={theme} />

      <main id="main-content" role="main">
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero theme={theme} />
            <Features theme={theme} />
            <DataTable theme={theme} />
          </motion.div>
        </Suspense>
      </main>

      <Footer theme={theme} />
    </div>
  );
});

App.displayName = 'App';

export default App;

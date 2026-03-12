import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onThemeToggle: () => void;
  theme: 'light' | 'dark';
}

const Header = memo<HeaderProps>(({ onThemeToggle, theme }) => {
  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } border-b`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl font-bold text-blue-500">Agency App</h1>
        </motion.div>

        <button
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 focus:ring-offset-gray-800'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          aria-pressed={theme === 'dark'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

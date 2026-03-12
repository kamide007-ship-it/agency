import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Check for reduced motion preferences
const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Report Web Vitals if Web Vitals library is available
if ('web-vital' in window) {
  // You can integrate with web-vitals library here
  // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
}

// Render app
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Handle theme persistence
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}

// Listen for system theme changes
preferReducedMotion.addEventListener('change', () => {
  // Framer Motion respects prefers-reduced-motion automatically
  document.documentElement.style.scrollBehavior = preferReducedMotion.matches
    ? 'auto'
    : 'smooth';
});

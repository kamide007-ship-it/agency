import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface FooterProps {
  theme: 'light' | 'dark';
}

const Footer = memo<FooterProps>(({ theme }) => {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'About', href: '#about', ariaLabel: 'About page' },
    { label: 'Privacy', href: '#privacy', ariaLabel: 'Privacy policy' },
    { label: 'Terms', href: '#terms', ariaLabel: 'Terms of service' },
    { label: 'Contact', href: '#contact', ariaLabel: 'Contact us' },
  ];

  const socialLinks = [
    { label: 'Twitter', href: '#twitter', icon: '𝕏' },
    { label: 'GitHub', href: '#github', icon: '⚙️' },
    { label: 'LinkedIn', href: '#linkedin', icon: '💼' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <footer
      className={`${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-gray-50 border-gray-200'
      } border-t transition-colors duration-300`}
      role="contentinfo"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-blue-500 mb-2">
              Agency App
            </h3>
            <p
              className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              Built with React, TypeScript, and Tailwind CSS for modern web
              applications.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav aria-label="Footer links">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors hover:text-blue-500 ${
                        theme === 'dark'
                          ? 'text-gray-400'
                          : 'text-gray-600'
                      }`}
                      aria-label={link.ariaLabel}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`text-2xl transition-transform hover:scale-110 ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={`Visit us on ${social.label}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className={`h-px ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          } mb-8`}
          role="presentation"
        />

        {/* Copyright */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            © {currentYear} Agency App. All rights reserved. Built with ❤️ for the web.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;

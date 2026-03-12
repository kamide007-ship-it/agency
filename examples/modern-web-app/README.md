# Modern Web App - Production-Ready React Example

A comprehensive, production-ready web application demonstrating modern React best practices with React 18.3.1, TypeScript, Tailwind CSS, and complete optimizations for performance, accessibility, and user experience.

## ✨ Features

### 🚀 Performance Optimized
- Code splitting with React.lazy and Suspense
- Virtual scrolling for large data sets
- Component memoization with React.memo
- Tree-shaking and dead code elimination
- Optimized bundle chunks (vendor isolation)
- Lighthouse performance monitoring

### ♿ WCAG 2.1 AA Accessible
- Semantic HTML structure
- Complete ARIA labeling
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- High contrast colors
- Reduced motion support

### 🎨 Modern UI/UX
- Responsive mobile-first design
- Smooth animations with Framer Motion
- Dark/light theme toggle
- Loading states and transitions
- Touch-friendly interactions
- Accessibility-first animations

### 🧪 Well Tested
- Jest testing framework
- React Testing Library
- jest-axe accessibility testing
- Unit and integration tests
- HTML test reports
- High code coverage

## 🛠️ Tech Stack

- **React 18.3.1** - UI library with hooks and Suspense
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 3.3.6** - Utility-first styling
- **Framer Motion 10.16.4** - Smooth animations
- **Jest & Testing Library** - Comprehensive testing
- **ESLint & Prettier** - Code quality tools
- **Lighthouse** - Performance auditing

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ (tested with 18+)
- npm or yarn

### Installation

```bash
cd examples/modern-web-app
npm install
```

### Development Server

```bash
npm run dev
```

Opens at `http://localhost:5173` with hot module replacement (HMR).

### Build for Production

```bash
npm run build
```

Creates optimized production bundle in `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Run Lighthouse Audit

```bash
npm run lighthouse
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── Header.tsx          # Sticky navigation header
│   ├── Hero.tsx            # Hero section with animations
│   ├── Features.tsx        # 6-feature grid showcase
│   ├── DataTable.tsx       # Virtualized table (100+ rows)
│   ├── Footer.tsx          # Footer with links
│   └── LoadingSpinner.tsx  # Loading indicator
├── __tests__/              # Test suite
│   ├── setup.ts            # Jest configuration
│   ├── App.test.tsx        # App component tests
│   └── components/         # Component tests with a11y checks
├── App.tsx                 # Root component with theme toggle
├── main.tsx                # Entry point
└── index.css               # Global styles + Tailwind

Configuration files:
├── vite.config.ts          # Build and dev server config
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS theme
├── jest.config.js          # Testing configuration
├── .eslintrc.json          # Code quality rules
└── lighthouse.config.js    # Performance audit settings
```

## 🎯 Key Implementation Areas

### Performance Optimization
- **Code Splitting**: Components loaded on-demand with React.lazy
- **Virtual Scrolling**: DataTable renders only visible rows
- **Component Memoization**: Prevents unnecessary re-renders
- **Optimized Bundles**: Separate chunks for vendors and animations
- **Bundle Analysis**: Visualizer shows chunk sizes

### Accessibility (WCAG 2.1 AA)
- **Semantic HTML**: Proper heading hierarchy, semantic elements
- **ARIA Labels**: Complete labeling for screen readers
- **Keyboard Navigation**: Full keyboard support, focus management
- **Color Contrast**: WCAG AA compliant ratios
- **Reduced Motion**: Respects user preferences
- **Automated Testing**: jest-axe for a11y checks

### User Experience
- **Responsive Design**: Mobile-first with Tailwind breakpoints
- **Dark Mode**: Theme toggle with persistence
- **Smooth Animations**: GPU-accelerated with Framer Motion
- **Loading States**: Suspense boundaries with fallback UI
- **Hover Effects**: Interactive feedback on all clickables

## 📊 Performance Targets

Lighthouse performance targets:

| Metric | Target | Achievable |
|--------|--------|-----------|
| Largest Contentful Paint (LCP) | < 2.5s | ✅ |
| First Input Delay (FID) | < 100ms | ✅ |
| Cumulative Layout Shift (CLS) | < 0.1 | ✅ |
| Performance Score | > 90 | ✅ |
| Accessibility Score | 100 | ✅ |
| Best Practices Score | 90+ | ✅ |
| SEO Score | 90+ | ✅ |

## 🧩 Component Details

### Header
- Sticky navigation with z-index management
- Theme toggle button with ARIA attributes
- Responsive layout

### Hero
- Gradient background with blur effects
- Staggered text animations
- Call-to-action button
- Decorative animated blobs

### Features
- 6-feature grid (responsive 1→3 columns)
- Hover animations on cards
- Icons with aria-hidden
- Theme-aware styling

### DataTable
- Virtual scrolling (renders 100+ rows efficiently)
- Keyboard navigation (arrows, Home, End)
- ARIA live regions for status
- Semantic table markup
- Performance optimized

### Footer
- Multiple link sections
- Social media icons
- Current year display
- Semantic structure

### LoadingSpinner
- Animated spinner with dots
- Proper ARIA role and label
- Accessible loading state

## 🧪 Testing

Complete test suite with:

- **Unit Tests**: Component rendering and props
- **Integration Tests**: Theme switching, interactions
- **Accessibility Tests**: jest-axe automated checks
- **Coverage**: Aim for 70%+ coverage

Run tests:

```bash
npm test                    # Run all tests
npm run test:coverage      # Generate coverage report
npm run test:watch         # Watch mode
```

## 📚 Documentation

See `IMPLEMENTATION_GUIDE.md` for detailed information about:

- Optimization patterns and techniques
- Accessibility implementation
- TypeScript best practices
- Testing strategies
- Configuration explanations
- Deployment checklist

## 🔧 Configuration Files

### vite.config.ts
- React plugin with fast refresh
- Manual code splitting
- Terser minification
- Bundle visualizer

### tsconfig.json
- Strict mode enabled
- No unused variables
- Modern module resolution
- React JSX support

### tailwind.config.js
- Custom color palette (blue/slate)
- Typography scale
- Safe area support
- Dark mode configuration

### jest.config.js
- TypeScript support via ts-jest
- jsdom test environment
- Coverage thresholds
- HTML test reports

### .eslintrc.json
- React plugin with hooks rules
- TypeScript plugin
- Accessibility plugin (jsx-a11y)
- Import ordering rules

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+

## 📦 Bundle Size

Optimized bundle sizes (gzipped):

- Main chunk: ~45KB
- React vendor: ~35KB
- Animation vendor: ~15KB
- CSS: ~8KB

**Total initial JS: ~95KB** (can be further optimized with route-based splitting)

## 🚀 Deployment

### Build Optimization

```bash
npm run build
```

Produces:
- Minified JavaScript with dead code elimination
- Optimized CSS bundle
- Asset optimization
- Source maps for debugging

### Recommended Hosting

- Vercel (auto-optimized for React/Vite)
- Netlify
- AWS Amplify
- CloudFlare Pages
- GitHub Pages (with build config)

### Environment Variables

```bash
# Create .env.local
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_KEY=your-key-here
```

## 🔒 Security

- Content Security Policy (CSP) headers configured
- No sensitive data in client-side code
- XSS protection with React's built-in escaping
- CORS headers properly set

## 📈 Monitoring

Integrate with services like:

- **Sentry** - Error tracking
- **DataDog** - Performance monitoring
- **Google Analytics** - User analytics
- **Web Vitals** - Core Web Vitals tracking

## 🤝 Contributing

1. Follow the existing code style
2. Write tests for new features
3. Ensure accessibility compliance
4. Check bundle size impact
5. Update documentation

## 📄 License

MIT

## 🔗 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [Vite Guide](https://vitejs.dev)
- [Testing Library](https://testing-library.com)

---

**Created**: March 2026
**Last Updated**: March 2026

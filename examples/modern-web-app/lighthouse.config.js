export default {
  // Chrome settings
  chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],

  // Output options
  output: 'html',
  outputPath: './lighthouse-report.html',

  // Audit settings
  onlyCategories: [
    'performance',
    'accessibility',
    'best-practices',
    'seo',
    'pwa',
  ],

  // Scoring options
  settings: {
    // Simulated throttling
    throttlingMethod: 'simulate',
    throttling: {
      rttMs: 40,
      downstreamThroughputKbps: 10240,
      upstreamThroughputKbps: 4096,
      cpuSlowdownMultiplier: 1,
    },

    // Form factor
    formFactor: 'desktop',

    // Device emulation (for mobile testing)
    emulatedFormFactor: 'mobile',

    // Locale
    locale: 'en',

    // Blocked URL patterns
    blockedUrlPatterns: [],

    // Additional HTTP headers
    extraHeaders: {
      'Cache-Control': 'public, max-age=3600',
    },

    // Precomputed lanterns for faster auditing
    precomputedLanterns: undefined,

    // Snapshot mode
    snapshotMode: false,

    // User agent override
    userAgent: undefined,

    // Wait for first contentful paint
    waitForLoad: 30000,

    // Gather mode timeout
    gatherMode: false,
  },

  // Audit options
  auditMode: false,

  // Gather more info for debugging
  logLevel: 'info',

  // Static analysis only (no Chrome needed)
  staticAnalysis: false,

  // Disable log collection
  disableFullPageScreenshot: false,

  // Custom config ID
  configPath: undefined,
};

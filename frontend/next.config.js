/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'chci.iitmandi.ac.in',
      'www.ihubiitmandi.in',
      'ihubiitmandi.in',
    ],
    unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  // Disable source maps during build to avoid potential issues
  productionBrowserSourceMaps: false,
  // Webpack configuration
  webpack: (config, { isServer, webpack, dev }) => {
    // Ignore certain modules during server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'redux-persist': 'commonjs redux-persist',
      });
    }
    
    // Only disable source map generation in production
    // In development, keep source maps for better debugging and HMR
    if (!dev) {
      config.devtool = false;
    }
    
    
    return config;
  },
}

module.exports = nextConfig


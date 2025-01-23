/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['@mui/icons-material', '@mui/material'],
  },
  images: {
    domains: ['res.cloudinary.com', 'your-cdn.com', 'localhost', 'exechire.co.za'], 
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    unoptimized: true, 
  },
  poweredByHeader: false,
  compress: true,
  distDir: '.next',
  assetPrefix: '',
  webpack: (config, { isServer }) => {
    // Add any custom webpack config here
    return config;
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  reactStrictMode: true,
}

module.exports = nextConfig

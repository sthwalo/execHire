/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Remove the output: 'export' to enable API routes
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig

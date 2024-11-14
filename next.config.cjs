/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: process.env.NODE_ENV === 'development',
    domains: ['your-domain-if-using-external-images.com'], // Only needed if using external images
  },
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'firebasestorage.googleapis.com', 'graph.facebook.com', 'lh3.googleusercontent.com'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      os: false,
      path: false,
      assert: false,
    };
    return config;
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/api/uploads/**',
      },
    ],
  },
  // Optional: Add if you need to handle other domains in the future
  // domains: ['yourdomain.com'],
};

export default nextConfig;
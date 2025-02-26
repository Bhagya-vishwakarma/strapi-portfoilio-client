/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi-portfolio-server.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;

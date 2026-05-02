/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/daffys-brewgarden-2',
  assetPrefix: '/daffys-brewgarden-2',
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;


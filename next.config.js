/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? '/daffys-brewgarden-2' : '',
  assetPrefix: isGithubActions ? '/daffys-brewgarden-2' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoBasePath = '/daffys-brewgarden-2';

const nextConfig = {
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? repoBasePath : '',
  assetPrefix: isGithubActions ? repoBasePath : '',
  images: {
    unoptimized: isGithubActions ? true : false,
    formats: ['image/webp'],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubActions ? repoBasePath : '',
  },
};

module.exports = nextConfig;


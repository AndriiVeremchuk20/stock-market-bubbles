/** @type {import('next').NextConfig} */
await import('./src/env.mjs');

const nextConfig = {
  images: {
    domains: ['financialmodelingprep.com'],
  },
};

export default nextConfig;

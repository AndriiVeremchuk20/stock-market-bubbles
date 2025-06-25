/** @type {import('next').NextConfig} */
await import('./src/env.mjs');

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['financialmodelingprep.com'],
  },
};

export default nextConfig;

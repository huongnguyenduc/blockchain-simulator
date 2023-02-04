/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    // API
    // API_URL: process.env.API_URL,
    BOOTSTRAP_IP: process.env.BOOTSTRAP_IP,
    BOOTSTRAP_PORT: process.env.BOOTSTRAP_PORT,
  },
};

module.exports = nextConfig;

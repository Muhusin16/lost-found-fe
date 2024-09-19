// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'], // Allow external images from Google Cloud Storage
  },
};

export default nextConfig;

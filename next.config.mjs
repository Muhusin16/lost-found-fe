/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      API_URL: process.env.NEXT_PUBLIC_API_BASE_URL, // Exposing the API URL
    },
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`, // Rewriting API routes
        },
      ];
    },
  };

export default nextConfig;

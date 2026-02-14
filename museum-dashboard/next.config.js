/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Allow imports from parent directory (shared folder)
    config.resolve.modules.push(path.resolve(__dirname, "../"));

    // Add shared folder to webpack compilation
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Increase timeout for slow networks
    unoptimized: true, // Disable optimization temporarily to bypass timeouts
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  // Increase experimental fetch timeout
  experimental: {
    proxyTimeout: 120000, // 2 minutes
  },
};

module.exports = nextConfig;

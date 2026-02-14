/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.20"],
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
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 90, 100],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

module.exports = nextConfig;

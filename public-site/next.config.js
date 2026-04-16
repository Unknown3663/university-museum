/** @type {import('next').NextConfig} */
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : null;
const supabaseHostname = supabaseOrigin
  ? new URL(supabaseOrigin).hostname
  : null;
const cspImageSources = [
  "'self'",
  "data:",
  "blob:",
  "https://*.supabase.co",
  "https://*.supabase.in",
];
const cspConnectSources = [
  "'self'",
  "https://*.supabase.co",
  "wss://*.supabase.co",
  "https://*.supabase.in",
  "wss://*.supabase.in",
  "https://va.vercel-scripts.com",
  "https://vitals.vercel-insights.com",
];

if (supabaseOrigin) {
  cspImageSources.push(supabaseOrigin);
  cspConnectSources.push(supabaseOrigin);
}

// 'unsafe-eval' is required by Next.js HMR in development but must NOT be
// shipped to production — it weakens the CSP against XSS attacks.
const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://cdn.vercel-insights.com"
  : "'self' 'unsafe-inline' https://va.vercel-scripts.com https://cdn.vercel-insights.com";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Resolve the "Missing source maps" DevTools warning for production builds
  productionBrowserSourceMaps: true,
  allowedDevOrigins: ["192.168.1.20"],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src ${scriptSrc}`,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              `img-src ${cspImageSources.join(" ")}`,
              "font-src 'self' https://fonts.gstatic.com",
              `connect-src ${cspConnectSources.join(" ")}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join("; "),
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Allow imports from parent directory (shared folder)
    config.resolve.modules.push(path.resolve(__dirname, "../"));

    // Explicit alias so HMR can track shared/ files properly (fixes Fast Refresh full-reload on navigation)
    config.resolve.alias = {
      ...config.resolve.alias,
      shared: path.resolve(__dirname, "../shared"),
    };

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
    qualities: [70, 75, 80, 85, 90, 100],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.in",
        pathname: "/storage/v1/object/public/**",
      },
      ...(supabaseHostname
        ? [
            {
              protocol: "https",
              hostname: supabaseHostname,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
    ],
  },
};

module.exports = nextConfig;

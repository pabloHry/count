import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization (required for Sharp)
  images: {
    unoptimized: true,
  },
  
  // Webpack configuration for native modules
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'skia-canvas'];
    }
    return config;
  },
  
  // Ensure API routes work correctly
  async headers() {
    return [
      {
        source: '/api/countdown-gif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

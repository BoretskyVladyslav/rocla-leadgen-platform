import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js "N" route indicator in development (never shown in production).
  devIndicators: false,
  images: {
    imageSizes: [16, 32, 48, 64, 80, 96, 128, 160, 240, 256, 320, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;

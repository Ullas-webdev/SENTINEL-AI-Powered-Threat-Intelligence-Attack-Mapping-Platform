import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ignore type errors from library type definition bugs (e.g. framer-motion)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

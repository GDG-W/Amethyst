import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/devfestlagos2025/**",
      },
    ],
  },
  webpack: (config) => {
    /**
     * This allows importing of svgs into files
     */
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    /**
     * The below just ensures the build environment respects the customized import paths, Next should do respect the config
     * in the tsconfig file, but it seems sometimes it does not, this just ensures it
     */
    config.resolve.alias["@"] = path.resolve(__dirname, "src");

    return config;
  },
};

export default nextConfig;

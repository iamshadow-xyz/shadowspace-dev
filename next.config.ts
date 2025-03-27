import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "o1xyekwwfl.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

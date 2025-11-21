// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",        // include this if you’re loading images from localhost:8000
        pathname: "/**",     // optional but recommended
      },
    ],
  },
  reactStrictMode: false,
  reactCompiler: true,
};

export default nextConfig;

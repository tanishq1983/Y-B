/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  turbopack: {
    root: process.cwd()
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/PHOTOS/**",
        search: ""
      }
    ]
  }
};

export default nextConfig;

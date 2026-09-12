/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  turbopack: {
    root: process.cwd()
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      },
      {
        protocol: "http",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;

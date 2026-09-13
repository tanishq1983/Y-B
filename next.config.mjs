/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  turbopack: {
    root: process.cwd()
  },
  images: {
    // Serve original files: the Netlify runtime's /_next/image handler 400s on
    // these photos, while the raw files are already web-sized (~200-400KB).
    // This makes image URLs identical on every host (Render/Netlify/Vercel).
    unoptimized: true,
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

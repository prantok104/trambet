/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'trambet.smshagor.com',
      }
    ],
  },
  source: '/:path*',
  destination: '/',
};

export default nextConfig;

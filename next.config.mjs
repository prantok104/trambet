/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'trambet.smshagor.com',
      }
    ],
},
};

export default nextConfig;

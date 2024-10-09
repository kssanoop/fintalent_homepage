/** @type {import('next').NextConfig} */
const nextConfig = {
  // compiler: {
  //   removeConsole: process.env.NEXT_PUBLIC_NODE_ENV !== "development",
  // },
  images: {
    // domains: ["images.pexels.com", "images.unsplash.com", "vm-trial-bucket-1.s3.ap-south-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vm-trial-bucket-1.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;

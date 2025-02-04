import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['i.pinimg.com',"vitalaidnsr.s3.ap-south-1.amazonaws.com"],
   
  }
};

export default nextConfig;

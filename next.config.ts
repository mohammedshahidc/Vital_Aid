import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['i.pinimg.com',"vitalaidnsr.s3.ap-south-1.amazonaws.com","vitalaidnsr.s3.undefined.amazonaws.com"],
   
  }
};

export default nextConfig;

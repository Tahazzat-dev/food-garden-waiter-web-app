import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.0.101", "localhost:3000"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com'
      },
      {
        protocol: 'https',
        hostname: 'api.bdchefchoice.com'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1'
      },
      {
        protocol: "https",
        hostname: "test.bdchefchoice.com",
        pathname: "/dashboard/images/**",
      },
    ]
  },
  devIndicators: {
    position: "top-right",
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

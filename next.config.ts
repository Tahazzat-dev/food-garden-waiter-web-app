import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
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
        protocol: 'https',
        hostname: 'test.bdchefchoice.com'
      },
    ]
  },
  devIndicators: {
    position: "top-right",
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

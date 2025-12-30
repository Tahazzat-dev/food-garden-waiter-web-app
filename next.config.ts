import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com'
      }
    ]
  },
  devIndicators: {
    position: "top-right",
  },
};


const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

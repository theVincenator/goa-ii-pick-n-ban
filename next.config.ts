import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/goa-ii-pick-n-ban',
  images: { unoptimized: true }
};

export default nextConfig;

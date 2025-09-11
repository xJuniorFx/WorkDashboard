import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 🚀 não falha o build por erros de ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // 🚀 não falha o build por erros de TypeScript
  },
};

export default nextConfig;

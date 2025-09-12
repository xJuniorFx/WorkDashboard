import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		optimizeCss: true,
	},
	output: 'export',
	reactStrictMode: true,
	trailingSlash: false,
	images: {
		unoptimized: true,
	},
};

export default nextConfig;

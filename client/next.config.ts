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
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pm-s3-imgs.s3.sa-east-1.amazonaws.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};

export default nextConfig;

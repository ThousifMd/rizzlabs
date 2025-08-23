import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/onboarding/:path*',
                destination: 'http://localhost:5001/api/onboarding/:path*',
            },
        ];
    },
};

export default nextConfig;


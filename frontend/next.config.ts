import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Removed localhost API rewrites for production deployment
    // These will be configured in Vercel environment variables
    // Environment variables will be loaded from frontend/.env.local by Next.js automatically
};

export default nextConfig;


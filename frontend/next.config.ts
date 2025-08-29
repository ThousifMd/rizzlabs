import type { NextConfig } from "next";
import { config } from "dotenv";
import path from "path";

// Load environment variables from parent directory
config({ path: path.join(__dirname, "../.env") });

const nextConfig: NextConfig = {
    // Removed localhost API rewrites for production deployment
    // These will be configured in Vercel environment variables
    env: {
        PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
        NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    }
};

export default nextConfig;


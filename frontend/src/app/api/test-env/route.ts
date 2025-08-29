import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        NODE_ENV: process.env.NODE_ENV,
        PAYPAL_CLIENT_ID_EXISTS: !!process.env.PAYPAL_CLIENT_ID,
        PAYPAL_CLIENT_SECRET_EXISTS: !!process.env.PAYPAL_CLIENT_SECRET,
        PAYPAL_CLIENT_ID_LENGTH: process.env.PAYPAL_CLIENT_ID?.length,
        PAYPAL_CLIENT_SECRET_LENGTH: process.env.PAYPAL_CLIENT_SECRET?.length,
        PAYPAL_CLIENT_ID_START: process.env.PAYPAL_CLIENT_ID?.substring(0, 10),
        PAYPAL_CLIENT_SECRET_START: process.env.PAYPAL_CLIENT_SECRET?.substring(0, 10),
    });
}

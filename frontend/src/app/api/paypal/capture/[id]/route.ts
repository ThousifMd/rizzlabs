import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        console.log('🔍 Capturing PayPal order:', id);

        // Check if we're using test credentials (only for development)
        if (process.env.NODE_ENV === 'development' && (process.env.SANDBOX_PAYPAL_CLIENT_ID === 'test' || process.env.SANDBOX_PAYPAL_SECRET_KEY === 'test')) {
            console.log('🧪 Using test mode - returning mock capture');

            // Return a mock capture for testing
            const mockCapture = {
                id: `test_capture_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                status: 'COMPLETED',
                amount: {
                    currency_code: 'USD',
                    value: '1.00'
                },
                create_time: new Date().toISOString(),
                update_time: new Date().toISOString(),
                final_capture: true
            };

            return NextResponse.json({
                success: true,
                capture: mockCapture
            });
        }

        const accessToken = await getAccessToken();
        console.log('🔑 Access token received for capture');

        const captureRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${id}/capture`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": `capture_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            },
        });

        const capture = await captureRes.json();

        if (!captureRes.ok) {
            console.error('❌ PayPal capture failed:', capture);
            return NextResponse.json({
                success: false,
                error: capture,
                message: "Failed to capture PayPal order"
            }, { status: captureRes.status });
        }

        console.log('✅ PayPal order captured successfully:', capture.id);

        return NextResponse.json({
            success: true,
            capture: capture
        });

    } catch (error) {
        console.error('❌ PayPal capture error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            message: "PayPal capture failed"
        }, { status: 500 });
    }
}

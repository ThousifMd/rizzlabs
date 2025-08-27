import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        console.log('🔍 Capturing PayPal order:', id);

        const accessToken = await getAccessToken();
        console.log('🔑 Access token received:', accessToken ? 'Yes' : 'No');

        const captureUrl = `${PAYPAL_API_BASE}/v2/checkout/orders/${id}/capture`;
        console.log('📡 Making capture request to:', captureUrl);

        const capRes = await fetch(captureUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": `capture_${id}_${Date.now()}`,
            },
        });

        console.log('📡 Capture response status:', capRes.status);
        console.log('📡 Capture response headers:', Object.fromEntries(capRes.headers.entries()));

        const capture = await capRes.json();
        console.log('📡 Capture response data:', capture);

        if (!capRes.ok) {
            console.error('❌ PayPal capture failed with status:', capRes.status);
            console.error('❌ PayPal capture failed with data:', capture);
            return NextResponse.json({
                error: capture,
                status: capRes.status,
                message: "PayPal capture failed"
            }, { status: capRes.status });
        }

        console.log('✅ PayPal payment captured successfully:', capture.id, 'Status:', capture.status);

        // TODO: Only mark as paid if capture.status === "COMPLETED"
        // TODO: Store payment record in database
        // TODO: Link payment to user's onboarding submission

        return NextResponse.json({
            success: true,
            capture: capture,
            message: "Payment captured successfully"
        });
    } catch (e: any) {
        console.error('❌ PayPal capture error:', e);
        return NextResponse.json({
            error: e.message,
            message: "PayPal capture error"
        }, { status: 500 });
    }
}

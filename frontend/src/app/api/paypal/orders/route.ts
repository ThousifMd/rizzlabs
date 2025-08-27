import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const { amount = "10.00", currency = "USD", reference_id = "DEMO-1", packageId, packageName } = body || {};

        const accessToken = await getAccessToken();

        const orderData: any = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id,
                    description: packageName || "Matchlens AI Package",
                    amount: { currency_code: currency, value: amount },
                    custom_id: packageId || reference_id,
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
                return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/onboarding/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/checkout`,
            },
        };

        console.log('Creating PayPal order with data:', JSON.stringify(orderData, null, 2));

        console.log('🔍 Making PayPal API call to:', `${PAYPAL_API_BASE}/v2/checkout/orders`);
        console.log('🔑 Access Token:', accessToken ? 'Present' : 'Missing');
        console.log('📦 Order Data:', JSON.stringify(orderData, null, 2));

        const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": `${reference_id}_${Date.now()}`,
            },
            body: JSON.stringify(orderData),
        });

        console.log('📡 PayPal API Response Status:', orderRes.status);
        console.log('📡 PayPal API Response Headers:', Object.fromEntries(orderRes.headers.entries()));

        const order = await orderRes.json();
        if (!orderRes.ok) {
            console.error('PayPal order creation failed:', order);
            return NextResponse.json({ error: order }, { status: orderRes.status });
        }

        console.log('PayPal order created:', order.id);
        return NextResponse.json(order);
    } catch (e: any) {
        console.error('PayPal order creation error:', e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

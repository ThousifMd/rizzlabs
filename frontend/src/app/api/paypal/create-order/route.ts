import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, PAYPAL_API_BASE } from "@/lib/paypal";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    try {
        const { amount = "1.00", description = "Test Payment", packageId, packageName } = await req.json();

        console.log('🔍 Creating PayPal order:', { amount, description, packageId, packageName });

        // Debug environment variables
        console.log('🔧 Environment check:');
        console.log('  NODE_ENV:', process.env.NODE_ENV);
        console.log('  PAYPAL_CLIENT_ID exists:', !!process.env.PAYPAL_CLIENT_ID);
        console.log('  PAYPAL_CLIENT_SECRET exists:', !!process.env.PAYPAL_CLIENT_SECRET);
        console.log('  PAYPAL_CLIENT_ID length:', process.env.PAYPAL_CLIENT_ID?.length);
        console.log('  PAYPAL_CLIENT_SECRET length:', process.env.PAYPAL_CLIENT_SECRET?.length);

        // Check if we're using test credentials (only for development)
        if (process.env.NODE_ENV === 'development' && (process.env.PAYPAL_CLIENT_ID === 'test' || process.env.PAYPAL_CLIENT_SECRET === 'test')) {
            console.log('🧪 Using test mode - returning mock order');

            // Return a mock order for testing
            const mockOrder = {
                id: `test_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                status: 'CREATED',
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        reference_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                        description: description,
                        custom_id: packageId || "test_package",
                        amount: {
                            currency_code: "USD",
                            value: amount.toString(),
                        },
                    },
                ],
            };

            return NextResponse.json({
                success: true,
                order: mockOrder,
                orderId: mockOrder.id
            });
        }

        console.log('🚀 Attempting to get PayPal access token...');
        const accessToken = await getAccessToken();
        console.log('🔑 Access token received:', accessToken ? 'Yes' : 'No');

        // Create order data
        const orderData = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    reference_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    description: description,
                    custom_id: packageId || "test_package",
                    amount: {
                        currency_code: "USD",
                        value: amount.toString(),
                    },
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW",
                return_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001'}/onboarding/success`,
                cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001'}/checkout`,
            },
        };

        console.log('📡 Creating order with data:', JSON.stringify(orderData, null, 2));

        const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": `create_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            },
            body: JSON.stringify(orderData),
        });

        const order = await orderRes.json();

        if (!orderRes.ok) {
            console.error('❌ PayPal order creation failed:', order);
            return NextResponse.json({
                success: false,
                error: order,
                message: "Failed to create PayPal order"
            }, { status: orderRes.status });
        }

        console.log('✅ PayPal order created successfully:', order.id);

        return NextResponse.json({
            success: true,
            order: order,
            orderId: order.id
        });

    } catch (error) {
        console.error('❌ PayPal order creation error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            message: "PayPal order creation failed"
        }, { status: 500 });
    }
}

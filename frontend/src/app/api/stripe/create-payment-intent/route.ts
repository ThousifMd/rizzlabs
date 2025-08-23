import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
    try {
        const { packageId, amount } = await request.json();

        // Validate package and amount
        const packages = {
            starter: 3900, // $39.00 in cents
            professional: 6900, // $69.00 in cents
            elite: 9900, // $99.00 in cents
            vip: 19900, // $199.00 in cents
        };

        const packageAmount = packages[packageId as keyof typeof packages];
        if (!packageAmount || packageAmount !== amount) {
            return NextResponse.json(
                { error: 'Invalid package or amount' },
                { status: 400 }
            );
        }

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
            metadata: {
                packageId,
                integration_check: 'accept_a_payment',
            },
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        return NextResponse.json(
            { error: 'Failed to create payment intent' },
            { status: 500 }
        );
    }
} 
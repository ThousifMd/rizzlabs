import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const paymentData = await request.json();
        
        // Validate required fields
        const { amount, currency, packageId, cardNumber, expiryDate, cvv, zipCode, email } = paymentData;
        
        if (!amount || !currency || !packageId || !cardNumber || !expiryDate || !cvv || !zipCode || !email) {
            return NextResponse.json(
                { success: false, error: 'Missing required payment information' },
                { status: 400 }
            );
        }

        // Basic card validation
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            return NextResponse.json(
                { success: false, error: 'Invalid card number' },
                { status: 400 }
            );
        }

        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return NextResponse.json(
                { success: false, error: 'Invalid expiry date format (MM/YY)' },
                { status: 400 }
            );
        }

        if (cvv.length < 3 || cvv.length > 4) {
            return NextResponse.json(
                { success: false, error: 'Invalid CVV' },
                { status: 400 }
            );
        }

        // Simulate Dodo payment processing
        // In a real implementation, you would:
        // 1. Call Dodo's payment API
        // 2. Handle the response
        // 3. Store payment information securely
        
        console.log('Processing Dodo payment:', {
            amount,
            currency,
            packageId,
            email,
            // Don't log sensitive card data in production
        });

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate payment success/failure based on card number
        // In production, this would be based on Dodo's actual response
        let paymentSuccess = true;
        let errorMessage = null;

        // Simulate some failure scenarios for testing
        if (cardNumber.includes('0000')) {
            paymentSuccess = false;
            errorMessage = 'Card declined by issuer';
        } else if (cardNumber.includes('1111')) {
            paymentSuccess = false;
            errorMessage = 'Insufficient funds';
        }

        if (!paymentSuccess) {
            return NextResponse.json({
                success: false,
                error: errorMessage || 'Payment failed'
            }, { status: 400 });
        }

        const paymentId = `dodo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        return NextResponse.json({
            success: true,
            paymentId,
            message: 'Payment processed successfully',
            amount: amount / 100, // Convert back to dollars for display
            currency
        });

    } catch (error) {
        console.error('Dodo payment error:', error);
        return NextResponse.json(
            { success: false, error: 'Payment processing failed' },
            { status: 500 }
        );
    }
}

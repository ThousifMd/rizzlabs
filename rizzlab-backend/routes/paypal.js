const express = require('express');
const router = express.Router();
const paypal = require('@paypal/paypal-server-sdk');
const { client } = require('../config/paypal');

// Create PayPal order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = 'USD', description, packageId } = req.body;

        const request = new paypal.OrdersController.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                reference_id: `order_${Date.now()}`,
                description: description || 'Matchlens AI Package',
                custom_id: packageId,
                amount: {
                    currency_code: currency,
                    value: amount.toString()
                }
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/onboarding/success`,
                cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/checkout`
            }
        });

        const order = await client.execute(request);

        console.log('PayPal order created:', order.result.id);
        res.json({
            success: true,
            order: order.result
        });

    } catch (error) {
        console.error('PayPal order creation error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Capture PayPal payment
router.post('/capture/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const request = new paypal.OrdersController.OrdersCaptureRequest(orderId);
        request.prefer("return=representation");

        const capture = await client.execute(request);

        console.log('PayPal payment captured:', capture.result.id);
        res.json({
            success: true,
            capture: capture.result
        });

    } catch (error) {
        console.error('PayPal capture error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Test PayPal connection
router.get('/test', async (req, res) => {
    try {
        // Test with a simple order creation
        const request = new paypal.OrdersController.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                reference_id: `test_${Date.now()}`,
                description: 'Test Payment',
                amount: {
                    currency_code: 'USD',
                    value: '1.00'
                }
            }]
        });

        const order = await client.execute(request);

        res.json({
            success: true,
            message: 'PayPal connection working',
            orderId: order.result.id
        });

    } catch (error) {
        console.error('PayPal test error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;

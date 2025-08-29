const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// CORS test endpoint
router.get('/test-cors', (req, res) => {
  res.json({
    success: true,
    message: 'CORS is working!',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin,
    method: req.method
  });
});

// Store payment and onboarding data
router.post('/store', async (req, res) => {
  try {
    console.log('Received payment data:', req.body);
    
    const { 
      orderId, 
      paymentId, 
      amount, 
      currency, 
      packageId, 
      packageName, 
      customerEmail,
      customerName,
      status = "completed",
      onboardingData = {}
    } = req.body;

    // Validate required fields
    if (!orderId || !paymentId || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert payment record into database
    const result = await pool.query(`
      INSERT INTO payments (
        order_id,
        payment_id,
        amount,
        currency,
        package_id,
        package_name,
        customer_email,
        customer_name,
        status,
        onboarding_data,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
      RETURNING id, order_id, payment_id, amount, created_at;
    `, [
      orderId,
      paymentId,
      amount,
      currency || 'USD',
      packageId || null,
      packageName || null,
      customerEmail || null,
      customerName || null,
      status,
      JSON.stringify(onboardingData)
    ]);

    console.log("Payment and onboarding data stored successfully:", result.rows[0]);

    res.json({
      success: true,
      payment: result.rows[0]
    });

  } catch (error) {
    console.error("Error storing payment:", error);
    res.status(500).json({ error: "Failed to store payment" });
  }
});

// Get all payments
router.get('/list', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        order_id,
        payment_id,
        amount,
        currency,
        package_id,
        package_name,
        customer_email,
        customer_name,
        status,
        onboarding_data,
        created_at
      FROM payments 
      ORDER BY created_at DESC
      LIMIT 100;
    `);

    console.log(`Found ${result.rows.length} payments`);

    res.json({
      success: true,
      payments: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

module.exports = router;

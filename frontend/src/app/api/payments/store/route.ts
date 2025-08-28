import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    ca: undefined,
    key: undefined,
    cert: undefined
  }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
      // Onboarding data
      onboardingData = {}
    } = body;

    // Validate required fields
    if (!orderId || !paymentId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      payment: result.rows[0]
    });

  } catch (error) {
    console.error("Error storing payment:", error);
    return NextResponse.json(
      { error: "Failed to store payment" },
      { status: 500 }
    );
  }
}

const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
    host: "db-postgresql-nyc3-89394-do-user-22973333-0.j.db.ondigitalocean.com",
    port: 25060,
    database: "defaultdb",
    user: "doadmin",
    password: "AVNS_8KyYVsHaIcFCsoAoLI5",
    ssl: {
        rejectUnauthorized: false,
        ca: undefined,
        key: undefined,
        cert: undefined
    }
});

async function checkPayments() {
    try {
        console.log('🔗 Connecting to DigitalOcean PostgreSQL...');

        // Test connection
        const client = await pool.connect();
        console.log('✅ Connected to database successfully!');

        // Get latest payments
        const result = await client.query(`
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
        created_at
      FROM payments 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

        console.log(`\n📊 Found ${result.rows.length} payments:`);
        console.log('='.repeat(80));

        result.rows.forEach((row, index) => {
            console.log(`\n${index + 1}. Payment ID: ${row.id}`);
            console.log(`   Order ID: ${row.order_id}`);
            console.log(`   Payment ID: ${row.payment_id}`);
            console.log(`   Amount: $${row.amount}`);
            console.log(`   Currency: ${row.currency}`);
            console.log(`   Package ID: ${row.package_id || 'Not specified'}`);
            console.log(`   Package Name: ${row.package_name || 'Not specified'}`);
            console.log(`   Customer Email: ${row.customer_email || 'Not provided'}`);
            console.log(`   Customer Name: ${row.customer_name || 'Not provided'}`);
            console.log(`   Status: ${row.status}`);
            console.log(`   Created: ${row.created_at}`);
            console.log('-'.repeat(40));
        });

        client.release();

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkPayments();

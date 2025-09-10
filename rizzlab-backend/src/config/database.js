const { Pool } = require('pg');

// PayPal Configuration - Force sandbox for consistency
const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com';

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://doadmin:AVNS_8KyYVsHaIcFCsoAoLI5@db-postgresql-nyc3-89394-do-user-22973333-0.j.db.ondigitalocean.com:25060/defaultdb",
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.on('connect', () => {
  console.log('✅ Connected to Digital Ocean PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

module.exports = pool;

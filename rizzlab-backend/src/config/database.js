const { Pool } = require('pg');

// PayPal Configuration - Force sandbox for consistency
const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com';

// Create a PostgreSQL connection pool
const pool = new Pool({
  host: "db-postgresql-nyc3-89394-do-user-22973333-0.j.db.ondigitalocean.com",
  port: 25060,
  database: "defaultdb",
  user: "doadmin",
  password: "AVNS_8KyYVsHaIcFCsoAoLI5",
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

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

async function checkOnboardingSubmissions() {
    try {
        console.log('🔗 Connecting to DigitalOcean PostgreSQL...');

        // Test connection
        const client = await pool.connect();
        console.log('✅ Connected to database successfully!');

        // Get latest onboarding submissions
        const result = await client.query(`
      SELECT 
        id,
        name,
        age,
        dating_goal,
        current_matches,
        body_type,
        style_preference,
        ethnicity,
        email,
        phone,
        weekly_tips,
        created_at
      FROM onboarding_submissions 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

        console.log(`\n📊 Found ${result.rows.length} onboarding submissions:`);
        console.log('='.repeat(80));

        result.rows.forEach((row, index) => {
            console.log(`\n${index + 1}. Submission ID: ${row.id}`);
            console.log(`   Name: ${row.name}`);
            console.log(`   Age: ${row.age}`);
            console.log(`   Email: ${row.email}`);
            console.log(`   Dating Goal: ${row.dating_goal}`);
            console.log(`   Current Matches: ${row.current_matches}`);
            console.log(`   Body Type: ${row.body_type}`);
            console.log(`   Style Preference: ${row.style_preference}`);
            console.log(`   Ethnicity: ${row.ethnicity || 'Not specified'}`);
            console.log(`   Phone: ${row.phone || 'Not provided'}`);
            console.log(`   Weekly Tips: ${row.weekly_tips ? 'Yes' : 'No'}`);
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

checkOnboardingSubmissions();

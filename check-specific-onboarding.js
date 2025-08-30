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

async function checkSpecificOnboarding() {
    try {
        console.log('🔗 Connecting to DigitalOcean PostgreSQL...');

        // Test connection
        const client = await pool.connect();
        console.log('✅ Connected to database successfully!');

        // Check for specific emails from recent payments
        const emailsToCheck = [
            'ninja@gmail.com',
            'mario@gmail.com', 
            'coolie@gmail.co',
            'udayagirithousif@gmail.com',
            'test@example.com',
            'test@test.com'
        ];

        console.log('\n🔍 Checking for onboarding submissions with payment emails:');
        console.log('='.repeat(80));

        for (const email of emailsToCheck) {
            const result = await client.query(`
                SELECT 
                    id,
                    name,
                    email,
                    created_at
                FROM onboarding_submissions 
                WHERE email = $1
                ORDER BY created_at DESC
            `, [email]);

            if (result.rows.length > 0) {
                console.log(`\n✅ Found ${result.rows.length} submission(s) for ${email}:`);
                result.rows.forEach((row, index) => {
                    console.log(`   - ID: ${row.id}, Name: ${row.name}, Created: ${row.created_at}`);
                });
            } else {
                console.log(`\n❌ NO onboarding submission found for ${email}`);
            }
        }

        // Also check the most recent onboarding submissions
        console.log('\n\n📊 Most recent onboarding submissions:');
        console.log('='.repeat(80));
        
        const recentResult = await client.query(`
            SELECT 
                id,
                name,
                email,
                created_at
            FROM onboarding_submissions 
            ORDER BY created_at DESC 
            LIMIT 5
        `);

        recentResult.rows.forEach((row, index) => {
            console.log(`${index + 1}. ID: ${row.id}, Name: ${row.name}, Email: ${row.email}, Created: ${row.created_at}`);
        });

        client.release();

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await pool.end();
    }
}

checkSpecificOnboarding();

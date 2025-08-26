const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function showLatestData() {
    try {
        console.log('🔗 Connecting to DigitalOcean PostgreSQL...');

        const client = await pool.connect();
        console.log('✅ Connected to database successfully!');

        // Get all submissions ordered by creation date (newest first)
        console.log('\n📊 Fetching all onboarding submissions...');
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
        interests,
        current_bio,
        email,
        phone,
        weekly_tips,
        original_photos,
        screenshot_photos,
        created_at,
        updated_at
      FROM onboarding_submissions 
      ORDER BY created_at DESC
    `);

        if (result.rows.length === 0) {
            console.log('❌ No submissions found in the database.');
        } else {
            console.log(`✅ Found ${result.rows.length} submission(s):\n`);

            result.rows.forEach((row, index) => {
                console.log(`📝 Submission #${index + 1} (ID: ${row.id})`);
                console.log('='.repeat(50));
                console.log(`👤 Name: ${row.name}`);
                console.log(`🎂 Age: ${row.age}`);
                console.log(`💕 Dating Goal: ${row.dating_goal}`);
                console.log(`📊 Current Matches: ${row.current_matches}`);
                console.log(`🏃 Body Type: ${row.body_type}`);
                console.log(`👔 Style Preference: ${row.style_preference}`);
                console.log(`🌍 Ethnicity: ${row.ethnicity || 'Not specified'}`);
                console.log(`🎯 Interests: ${JSON.stringify(row.interests)}`);
                console.log(`📝 Current Bio: ${row.current_bio || 'Not provided'}`);
                console.log(`📧 Email: ${row.email}`);
                console.log(`📱 Phone: ${row.phone || 'Not provided'}`);
                console.log(`📬 Weekly Tips: ${row.weekly_tips ? 'Yes' : 'No'}`);
                console.log(`📸 Original Photos: ${row.original_photos ? JSON.stringify(row.original_photos) : 'None'}`);
                console.log(`📱 Screenshot Photos: ${row.screenshot_photos ? JSON.stringify(row.screenshot_photos) : 'None'}`);
                console.log(`⏰ Created: ${row.created_at}`);
                console.log(`🔄 Updated: ${row.updated_at}`);
                console.log('');
            });

            // Show summary statistics
            console.log('📈 Summary Statistics:');
            console.log('='.repeat(30));
            console.log(`Total Submissions: ${result.rows.length}`);

            // Count by dating goal
            const datingGoals = {};
            result.rows.forEach(row => {
                datingGoals[row.dating_goal] = (datingGoals[row.dating_goal] || 0) + 1;
            });
            console.log('\nDating Goals:');
            Object.entries(datingGoals).forEach(([goal, count]) => {
                console.log(`  ${goal}: ${count}`);
            });

            // Count by body type
            const bodyTypes = {};
            result.rows.forEach(row => {
                bodyTypes[row.body_type] = (bodyTypes[row.body_type] || 0) + 1;
            });
            console.log('\nBody Types:');
            Object.entries(bodyTypes).forEach(([type, count]) => {
                console.log(`  ${type}: ${count}`);
            });

            // Count by style preference
            const styles = {};
            result.rows.forEach(row => {
                styles[row.style_preference] = (styles[row.style_preference] || 0) + 1;
            });
            console.log('\nStyle Preferences:');
            Object.entries(styles).forEach(([style, count]) => {
                console.log(`  ${style}: ${count}`);
            });

            // Average age
            const ages = result.rows.map(row => parseInt(row.age)).filter(age => !isNaN(age));
            if (ages.length > 0) {
                const avgAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
                console.log(`\nAverage Age: ${avgAge.toFixed(1)}`);
            }

            // Weekly tips opt-in rate
            const weeklyTipsCount = result.rows.filter(row => row.weekly_tips).length;
            const weeklyTipsRate = (weeklyTipsCount / result.rows.length * 100).toFixed(1);
            console.log(`Weekly Tips Opt-in Rate: ${weeklyTipsRate}% (${weeklyTipsCount}/${result.rows.length})`);
        }

        client.release();
        await pool.end();

        console.log('\n🎉 Data retrieval complete!');

    } catch (error) {
        console.error('❌ Error retrieving data:', error.message);
        process.exit(1);
    }
}

showLatestData();

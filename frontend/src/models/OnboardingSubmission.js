const pool = require('../config/database');

class OnboardingSubmission {
    // Create a new submission
    static async create(submissionData) {
        const {
            name,
            age,
            datingGoal,
            currentMatches,
            bodyType,
            stylePreference,
            ethnicity,
            interests,
            currentBio,
            email,
            phone,
            weeklyTips,
            originalPhotos,
            screenshotPhotos
        } = submissionData;

        const query = `
      INSERT INTO onboarding_submissions (
        name, age, dating_goal, current_matches, body_type, style_preference,
        ethnicity, interests, current_bio, email, phone, weekly_tips,
        original_photos, screenshot_photos
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;

        const values = [
            name,
            age,
            datingGoal,
            currentMatches,
            bodyType,
            stylePreference,
            ethnicity,
            JSON.stringify(interests),
            currentBio,
            email,
            phone,
            weeklyTips,
            JSON.stringify(originalPhotos || []),
            JSON.stringify(screenshotPhotos || [])
        ];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Get submission by ID
    static async findById(id) {
        const query = 'SELECT * FROM onboarding_submissions WHERE id = $1';

        try {
            const result = await pool.query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Get all submissions (for admin purposes)
    static async findAll() {
        const query = 'SELECT * FROM onboarding_submissions ORDER BY created_at DESC';

        try {
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }

    // Get submissions by email
    static async findByEmail(email) {
        const query = 'SELECT * FROM onboarding_submissions WHERE email = $1 ORDER BY created_at DESC';

        try {
            const result = await pool.query(query, [email]);
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = OnboardingSubmission;

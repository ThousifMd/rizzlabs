const pool = require("../config/database");

class OnboardingSubmission {
  static async create(submissionData) {
    const {
      name, gender, age, datingGoal, currentMatches, bodyType, stylePreference,
      ethnicity, interests, currentBio, email, phone, weeklyTips,
      originalPhotos, screenshotPhotos, expectedDelivery
    } = submissionData;

    const query = `
      INSERT INTO onboarding_submissions (
        name, gender, age, dating_goal, current_matches, body_type, style_preference,
        ethnicity, interests, current_bio, email, phone, weekly_tips,
        original_photos, screenshot_photos, expected_delivery
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;

    const values = [
      name, gender, age, datingGoal, currentMatches, bodyType, stylePreference,
      ethnicity, JSON.stringify(interests), currentBio, email, phone,
      weeklyTips, JSON.stringify(originalPhotos || []), JSON.stringify(screenshotPhotos || []), expectedDelivery
    ];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    const query = "SELECT * FROM onboarding_submissions WHERE id = $1";
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    const query = "SELECT * FROM onboarding_submissions ORDER BY created_at DESC";
    try {
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    const query = "SELECT * FROM onboarding_submissions WHERE email = $1 ORDER BY created_at DESC";
    try {
      const result = await pool.query(query, [email]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = OnboardingSubmission;

-- Create onboarding_submissions table
CREATE TABLE IF NOT EXISTS onboarding_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age VARCHAR(10) NOT NULL,
  dating_goal VARCHAR(50) NOT NULL,
  current_matches VARCHAR(20) NOT NULL,
  body_type VARCHAR(50) NOT NULL,
  style_preference VARCHAR(50) NOT NULL,
  ethnicity VARCHAR(100),
  interests JSONB NOT NULL,
  current_bio TEXT,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  weekly_tips BOOLEAN DEFAULT true,
  original_photos JSONB,
  screenshot_photos JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_email ON onboarding_submissions(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_onboarding_submissions_created_at ON onboarding_submissions(created_at);

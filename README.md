# RizzLab Backend API

A Node.js/Express backend API for handling RizzLab onboarding submissions.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (DigitalOcean recommended)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

3. **Set up database:**
   ```bash
   # Run the schema.sql file in your PostgreSQL database
   psql -d your_database -f src/config/schema.sql
   ```

4. **Start the server:**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📊 API Endpoints

### Health Check
```
GET /health
```

### Onboarding Submissions

#### Submit New Onboarding
```
POST /api/onboarding/submit
```

**Request Body:**
```json
{
  "name": "John Doe",
  "age": "25",
  "datingGoal": "relationship",
  "currentMatches": "3-5",
  "bodyType": "athletic",
  "stylePreference": "casual",
  "ethnicity": "white",
  "interests": ["gym", "travel", "food"],
  "currentBio": "I love traveling and working out",
  "email": "john@example.com",
  "phone": "+1234567890",
  "weeklyTips": true,
  "originalPhotos": [],
  "screenshotPhotos": []
}
```

**Response:**
```json
{
  "success": true,
  "submissionId": 1,
  "message": "Onboarding submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Submission by ID
```
GET /api/onboarding/:id
```

#### Get All Submissions
```
GET /api/onboarding
```

#### Get Submissions by Email
```
GET /api/onboarding/email/:email
```

## 🗄️ Database Schema

The `onboarding_submissions` table stores:

- **Personal Info**: name, age, email, phone
- **Dating Preferences**: datingGoal, currentMatches, bodyType, stylePreference
- **Interests**: JSON array of selected interests
- **Photos**: JSON arrays for original and screenshot photos
- **Metadata**: timestamps, weekly tips preference

## 🔧 Configuration

### Environment Variables

```env
DATABASE_URL=postgresql://username:password@host:port/database
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## 🧪 Testing

Test the API endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:5000/health

# Submit onboarding
curl -X POST http://localhost:5000/api/onboarding/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "age": "25",
    "datingGoal": "relationship",
    "currentMatches": "3-5",
    "bodyType": "athletic",
    "stylePreference": "casual",
    "interests": ["gym", "travel", "food"],
    "email": "test@example.com"
  }'
```

## 📁 Project Structure

```
rizzlab-backend/
├── src/
│   ├── config/
│   │   ├── database.js      # Database connection
│   │   └── schema.sql       # Database schema
│   ├── models/
│   │   └── OnboardingSubmission.js  # Data model
│   ├── middleware/
│   │   └── validation.js    # Input validation
│   ├── routes/
│   │   └── onboarding.js    # API routes
│   └── app.js               # Main application
├── package.json
├── .env
└── README.md
```

## 🚀 Deployment

1. **Set up PostgreSQL database** (DigitalOcean, AWS RDS, etc.)
2. **Update environment variables** with production database URL
3. **Deploy to your preferred platform** (Railway, Render, Heroku, etc.)
4. **Update frontend** to use production API URL

## 🔒 Security

- Input validation on all endpoints
- CORS configuration for frontend
- SQL injection prevention with parameterized queries
- Error handling without exposing sensitive information

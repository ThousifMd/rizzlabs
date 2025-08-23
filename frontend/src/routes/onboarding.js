const express = require('express');
const router = express.Router();
const OnboardingSubmission = require('../models/OnboardingSubmission');
const { validateOnboardingSubmission } = require('../middleware/validation');
const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

// Test route to debug FormData
router.post('/test', upload.none(), (req, res) => {
  console.log('Test route - req.body:', req.body);
  console.log('Test route - req.files:', req.files);
  res.json({
    success: true,
    body: req.body,
    files: req.files
  });
});

// Helper function to upload files to Cloudinary
async function uploadFilesToCloudinary(files) {
  if (!files || files.length === 0) return [];
  
  const uploadPromises = files.map(file => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'rizzlab-photos',
          resource_type: 'auto',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              width: result.width,
              height: result.height
            });
          }
        }
      );
      
      stream.end(file.buffer);
    });
  });
  
  try {
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading files to Cloudinary:', error);
    throw new Error('Failed to upload photos');
  }
}

// POST /api/onboarding/submit - Submit new onboarding data (with optional file uploads)
router.post('/submit',
  upload.fields([
    { name: 'originalPhotos', maxCount: 20 },
    { name: 'screenshotPhotos', maxCount: 10 }
  ]),
  validateOnboardingSubmission,
  async (req, res) => {
    try {
      let originalPhotos = [];
      let screenshotPhotos = [];
      
      // Upload original photos if provided
      if (req.files && req.files.originalPhotos) {
        originalPhotos = await uploadFilesToCloudinary(req.files.originalPhotos);
      }
      
      // Upload screenshot photos if provided
      if (req.files && req.files.screenshotPhotos) {
        screenshotPhotos = await uploadFilesToCloudinary(req.files.screenshotPhotos);
      }
      
      // Prepare submission data
      const submissionData = {
        ...req.body,
        originalPhotos,
        screenshotPhotos
      };
      
      const submission = await OnboardingSubmission.create(submissionData);
      
      res.status(201).json({
        success: true,
        submissionId: submission.id,
        message: 'Onboarding submitted successfully',
        data: {
          id: submission.id,
          name: submission.name,
          email: submission.email,
          createdAt: submission.created_at,
          photoCount: {
            original: originalPhotos.length,
            screenshots: screenshotPhotos.length
          }
        }
      });
    } catch (error) {
      console.error('Error creating submission:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to submit onboarding data'
      });
    }
  }
);

// GET /api/onboarding/:id - Get submission by ID
router.get('/:id', async (req, res) => {
  try {
    const submission = await OnboardingSubmission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: 'Submission not found'
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submission'
    });
  }
});

// GET /api/onboarding - Get all submissions (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const submissions = await OnboardingSubmission.findAll();
    
    res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submissions'
    });
  }
});

// GET /api/onboarding/email/:email - Get submissions by email
router.get('/email/:email', async (req, res) => {
  try {
    const submissions = await OnboardingSubmission.findByEmail(req.params.email);
    
    res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error('Error fetching submissions by email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch submissions'
    });
  }
});

module.exports = router;

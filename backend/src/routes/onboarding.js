const express = require("express");
const router = express.Router();
const OnboardingSubmission = require("../models/OnboardingSubmission");
const { validateOnboardingSubmission } = require("../middleware/validation");

// Get all submissions (must come before /:id route)
router.get("/", async (req, res) => {
  try {
    const submissions = await OnboardingSubmission.findAll();
    
    res.json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch submissions"
    });
  }
});

// Submit new onboarding
router.post("/submit", validateOnboardingSubmission, async (req, res) => {
  try {
    const submission = await OnboardingSubmission.create(req.body);
    
    res.status(201).json({
      success: true,
      submissionId: submission.id,
      message: "Onboarding submitted successfully",
      data: {
        id: submission.id,
        name: submission.name,
        email: submission.email,
        createdAt: submission.created_at
      }
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({
      success: false,
      error: "Failed to submit onboarding data"
    });
  }
});

// Get submission by ID (must come after / route)
router.get("/:id", async (req, res) => {
  try {
    const submission = await OnboardingSubmission.findById(req.params.id);
    
    if (!submission) {
      return res.status(404).json({
        success: false,
        error: "Submission not found"
      });
    }

    res.json({
      success: true,
      data: submission
    });
  } catch (error) {
    console.error("Error fetching submission:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch submission"
    });
  }
});

module.exports = router;

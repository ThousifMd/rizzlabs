const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config({ path: "../.env" });

const onboardingRoutes = require("./routes/onboarding");
const paymentRoutes = require("./routes/payments");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Configure multer for handling FormData
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 20 // Max 20 files
  }
});

// Make multer available to routes
app.locals.upload = upload;

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "RizzLab Backend is running",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/payments", paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 RizzLab Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API docs: http://localhost:${PORT}/api/onboarding`);
});

module.exports = app;

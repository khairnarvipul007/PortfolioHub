const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// GET /api/profiles/:id
// Retrieves profile details for a given user ID
router.get("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile ID format",
      });
    }

    // =========================================================================
    // IDOR VULNERABILITY & OWNERSHIP VALIDATION:
    // When ownership is enforced (default), the server validates that the
    // authenticated user's ID (from verified JWT) matches the requested :id.
    // To demonstrate the vulnerability before fixing:
    // pass ?simulate_vulnerable=true or set DISABLE_OWNERSHIP_CHECK=true
    // =========================================================================
    const isVulnerableSimulation =
      req.query.simulate_vulnerable === "true" ||
      process.env.DISABLE_OWNERSHIP_CHECK === "true";

    if (!isVulnerableSimulation && req.user._id.toString() !== id) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    const profile = await User.findById(id).select(
      "name email role createdAt"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Prevent sensitive profile responses from being stored in intermediate caches
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: profile,
    });
  } catch (error) {
    console.error("Profile retrieval error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve profile",
    });
  }
});

module.exports = router;

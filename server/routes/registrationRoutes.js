const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// @desc    Register for a portfolio event
// @route   POST /api/registrations
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId || !mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({ message: "Valid event ID is required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Portfolio event not found" });
    }

    const alreadyRegistered = await Registration.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "Already registered for this portfolio event" });
    }

    const registration = await Registration.create({
      user: req.user._id,
      event: eventId,
    });

    res.status(201).json({
      message: "Successfully registered for portfolio event",
      registration,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Already registered for this portfolio event" });
    }
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get my registrations
// @route   GET /api/registrations/my
// @access  Private
router.get("/my", protect, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate("event")
      .sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all registrations (Admin)
// @route   GET /api/registrations
// @access  Private/Admin
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate("user", "name email")
      .populate("event", "title date location")
      .sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

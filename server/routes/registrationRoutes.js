const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const { protect } = require('../middleware/authMiddleware');

// @desc    Register for an event
// @route   POST /api/registrations
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { eventId } = req.body;

    const alreadyRegistered = await Registration.findOne({
      user: req.user._id,
      event: eventId,
    });

    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    const registration = await Registration.create({
      user: req.user._id,
      event: eventId,
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get my registrations
// @route   GET /api/registrations/my
// @access  Private
router.get('/my', protect, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user._id })
      .populate('event');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all registrations (Admin)
// @route   GET /api/registrations
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'name email')
      .populate('event', 'title date');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

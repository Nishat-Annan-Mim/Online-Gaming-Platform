// routes/parentalControlRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const protectRoute = require('../middleware/protectRoute');
const User = require('../models/User');

// @route   GET /api/parental-controls
// @desc    Get current user's parental control settings
// @access  Private
router.get('/', protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('parentalControls');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.parentalControls);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/parental-controls
// @desc    Update current user's parental control settings
// @access  Private
router.put(
  '/',
  [
    protectRoute,
    check('ageLimit', 'Age limit must be a non-negative number')
      .optional()
      .isInt({ min: 0 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { enabled, ageLimit } = req.body;
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Update fields if provided
      if (typeof enabled === 'boolean') user.parentalControls.enabled = enabled;
      if (ageLimit !== undefined) user.parentalControls.ageLimit = ageLimit;

      await user.save();
      res.json(user.parentalControls);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

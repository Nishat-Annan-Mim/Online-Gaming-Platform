// routes/recommendationRoutes.js
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/protectRoute');
const Game = require('../models/Game');
const User = require('../models/User');

// @route   GET /api/recommendations
// @desc    Get recommended games based on user's played games
// @access  Private
router.get('/', protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('playedGames');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Collect all tags from played games
    const playedTags = new Set();
    user.playedGames.forEach(game => {
      game.tags.forEach(tag => playedTags.add(tag));
    });

    if (playedTags.size === 0) {
      return res.json([]); // No recommendations if no history
    }

    // Find games with overlapping tags not already played
    const recommendations = await Game.find({
      _id: { $nin: user.playedGames.map(g => g._id) },
      tags: { $in: Array.from(playedTags) }
    }).limit(10);

    res.json(recommendations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

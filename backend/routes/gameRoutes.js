// routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Game = require('../models/Game');
const User = require('../models/User');

// @route   GET /api/games
// @desc    List all games in catalog
router.get('/', async (req, res) => {
  try {
    const games = await Game.find().select('-__v');
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/games/:gameId/install
// @desc    Install a game for the current user
// @access  Private
router.post('/:gameId/install', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ msg: 'Game not found' });

    const user = await User.findById(req.user.id);
    // Prevent duplicate installs
    if (user.installedGames.some(g => g.game.equals(req.params.gameId))) {
      return res.status(400).json({ msg: 'Game already installed' });
    }
    user.installedGames.push({ game: game._id, version: game.latestVersion });
    await user.save();
    res.json({ msg: 'Game installed', installedGames: user.installedGames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/games/:gameId/uninstall
// @desc    Uninstall a game for the current user
// @access  Private
router.post('/:gameId/uninstall', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.installedGames = user.installedGames.filter(g => !g.game.equals(req.params.gameId));
    await user.save();
    res.json({ msg: 'Game uninstalled', installedGames: user.installedGames });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/games/installed
// @desc    Get the current user's installed games (with titles and versions)
// @access  Private
router.get('/installed', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('installedGames.game', 'title latestVersion');
    res.json(user.installedGames);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/games/:gameId/update
// @desc    Auto-update a game if a newer version is available
// @access  Private
router.post('/:gameId/update', auth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) return res.status(404).json({ msg: 'Game not found' });

    const user = await User.findById(req.user.id);
    const installed = user.installedGames.find(g => g.game.equals(game._id));
    if (!installed) return res.status(400).json({ msg: 'Game not installed' });

    // Compare versions (simple string compare; in practice use semver)
    if (installed.version === game.latestVersion) {
      return res.status(200).json({ msg: 'Game is already up to date' });
    }

    installed.version = game.latestVersion;
    await user.save();
    res.json({ msg: 'Game updated', newVersion: installed.version });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;

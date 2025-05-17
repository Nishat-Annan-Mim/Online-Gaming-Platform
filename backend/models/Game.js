// models/Game.js
const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [String],
  latestVersion: { type: String, required: true }
});
module.exports = mongoose.model('Game', GameSchema);

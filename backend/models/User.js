// models/User.js
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // ... other user fields ...
  parentalControls: {
    enabled: { type: Boolean, default: false },
    ageLimit: { type: Number, default: 0 }
  },
  installedGames: [{
    game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
    version: { type: String }
  }],
  playedGames: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});
module.exports = mongoose.model('User', UserSchema);

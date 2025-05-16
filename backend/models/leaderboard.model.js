import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    achievements: [{
      name: String,
      description: String,
      dateEarned: Date,
      points: Number
    }],
    totalPoints: {
      type: Number,
      default: 0,
    },
    rank: {
      type: Number,
      default: 0,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
);

// Index for efficient querying
leaderboardSchema.index({ gameId: 1, score: -1 });
leaderboardSchema.index({ userId: 1, gameId: 1 }, { unique: true });

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

export default Leaderboard;
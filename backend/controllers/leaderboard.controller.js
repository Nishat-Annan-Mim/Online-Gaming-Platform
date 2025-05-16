import Leaderboard from "../models/leaderboard.model.js";
import User from "../models/user.model.js";

// Get leaderboard for a specific game
export const getGameLeaderboard = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { timeFrame = "all" } = req.query; // all, monthly, weekly

    let dateFilter = {};
    if (timeFrame === "monthly") {
      dateFilter = {
        lastUpdated: {
          $gte: new Date(new Date().setDate(1)) // First day of current month
        }
      };
    } else if (timeFrame === "weekly") {
      dateFilter = {
        lastUpdated: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7)) // Last 7 days
        }
      };
    }

    const leaderboard = await Leaderboard.find({ gameId, ...dateFilter })
      .populate("userId", "username profilePic")
      .sort({ score: -1 })
      .limit(100);

    // Update ranks
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

// Update player score
export const updateScore = async (req, res) => {
  try {
    const { gameId, score } = req.body;
    const userId = req.user._id;

    let leaderboardEntry = await Leaderboard.findOne({ userId, gameId });

    if (!leaderboardEntry) {
      leaderboardEntry = new Leaderboard({
        userId,
        gameId,
        score
      });
    } else {
      leaderboardEntry.score = Math.max(leaderboardEntry.score, score);
    }

    leaderboardEntry.lastUpdated = new Date();
    await leaderboardEntry.save();

    res.status(200).json(leaderboardEntry);
  } catch (error) {
    console.error("Error updating score:", error);
    res.status(500).json({ error: "Failed to update score" });
  }
};

// Add achievement
export const addAchievement = async (req, res) => {
  try {
    const { gameId, achievement } = req.body;
    const userId = req.user._id;

    const leaderboardEntry = await Leaderboard.findOne({ userId, gameId });

    if (!leaderboardEntry) {
      return res.status(404).json({ error: "Leaderboard entry not found" });
    }

    // Check if achievement already exists
    const achievementExists = leaderboardEntry.achievements.some(
      a => a.name === achievement.name
    );

    if (!achievementExists) {
      leaderboardEntry.achievements.push({
        ...achievement,
        dateEarned: new Date()
      });
      leaderboardEntry.totalPoints += achievement.points || 0;
      await leaderboardEntry.save();
    }

    res.status(200).json(leaderboardEntry);
  } catch (error) {
    console.error("Error adding achievement:", error);
    res.status(500).json({ error: "Failed to add achievement" });
  }
};

// Get user's achievements
export const getUserAchievements = async (req, res) => {
  try {
    const userId = req.user._id;
    const { gameId } = req.params;

    const leaderboardEntry = await Leaderboard.findOne({ userId, gameId })
      .populate("userId", "username profilePic");

    if (!leaderboardEntry) {
      return res.status(404).json({ error: "No achievements found" });
    }

    res.status(200).json(leaderboardEntry.achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
};
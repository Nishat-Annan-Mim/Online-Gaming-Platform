import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    gamePreferences: [{
      type: String,
    }],
    subscriptionStatus: {
      type: String,
      enum: ["none", "basic", "premium"],
      default: "none",
    },
    subscriptionExpiry: {
      type: Date,
    },
    purchasedGames: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
    }],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile; 
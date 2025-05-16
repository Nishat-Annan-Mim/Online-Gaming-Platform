import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Leaderboard.module.css";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const [selectedGame, setSelectedGame] = useState(null);
  const [timeFrame, setTimeFrame] = useState("all");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const games = [
    { id: 1, name: "Tic Tac Toe", icon: "🎮" },
    { id: 2, name: "Match Game", icon: "🎲" },
    { id: 3, name: "Online Multiplayer", icon: "🎯" }
  ];

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    if (selectedGame) {
      fetchLeaderboard();
    }
  }, [selectedGame, timeFrame]);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/leaderboard/game/${selectedGame.id}?timeFrame=${timeFrame}`);
      setLeaderboardData(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch leaderboard data");
      console.error("Error fetching leaderboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleTimeFrameChange = (frame) => {
    setTimeFrame(frame);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatScore = (score) => {
    return score.toLocaleString();
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "#ffd700"; // Gold
    if (rank === 2) return "#c0c0c0"; // Silver
    if (rank === 3) return "#cd7f32"; // Bronze
    return "#f0a4a4";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back
        </button>
        <h1>Leaderboard</h1>
      </div>

      <div className={styles.content}>
        <div className={styles.gameSelection}>
          <h2>Select Game</h2>
          <div className={styles.gameList}>
            {games.map((game) => (
              <div
                key={game.id}
                className={`${styles.gameCard} ${
                  selectedGame?.id === game.id ? styles.selected : ""
                }`}
                onClick={() => handleGameSelect(game)}
              >
                <span className={styles.gameIcon}>{game.icon}</span>
                <h3>{game.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {selectedGame && (
          <div className={styles.leaderboardSection}>
            <div className={styles.timeFrameSelector}>
              <button
                className={`${styles.timeButton} ${
                  timeFrame === "all" ? styles.selected : ""
                }`}
                onClick={() => handleTimeFrameChange("all")}
              >
                All Time
              </button>
              <button
                className={`${styles.timeButton} ${
                  timeFrame === "monthly" ? styles.selected : ""
                }`}
                onClick={() => handleTimeFrameChange("monthly")}
              >
                Monthly
              </button>
              <button
                className={`${styles.timeButton} ${
                  timeFrame === "weekly" ? styles.selected : ""
                }`}
                onClick={() => handleTimeFrameChange("weekly")}
              >
                Weekly
              </button>
            </div>

            {isLoading ? (
              <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
                Loading leaderboard...
              </div>
            ) : error ? (
              <div className={styles.error}>
                <span>⚠️</span> {error}
              </div>
            ) : leaderboardData.length === 0 ? (
              <div className={styles.noData}>
                No data available for this time period
              </div>
            ) : (
              <div className={styles.leaderboardList}>
                {leaderboardData.map((entry) => (
                  <div key={entry._id} className={styles.leaderboardItem}>
                    <div 
                      className={styles.rank}
                      style={{ color: getRankColor(entry.rank) }}
                    >
                      #{entry.rank}
                    </div>
                    <div className={styles.playerInfo}>
                      <img
                        src={entry.userId.profilePic || "/default-avatar.png"}
                        alt={entry.userId.username}
                        className={styles.avatar}
                      />
                      <span className={styles.username}>
                        {entry.userId.username}
                      </span>
                    </div>
                    <div className={styles.score}>
                      {formatScore(entry.score)}
                    </div>
                    <div className={styles.achievements}>
                      {entry.achievements.length > 0 && (
                        <span className={styles.achievementCount}>
                          🏆 {entry.achievements.length}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
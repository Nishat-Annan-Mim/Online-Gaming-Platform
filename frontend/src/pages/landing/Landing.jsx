import React from "react";
import { useContext } from "react";
import styles from "./Landing.module.css"; // ✅ Correct import
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Landing = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  return (
    <div className={styles["landing-body"]}>
      <header className={styles["nav-placeholder"]}></header>

      <main className={styles["main-content"]}>
        <div className={styles["button-container"]}>
          {authUser?.username === "eight" && (
            <button
              className={styles["action-button"]}
              onClick={() => navigate("/admin")}
            >
              Admin Panel
            </button>
          )}
          <button
            className={styles["action-button"]}
            onClick={() => navigate("/profile")}
          >
            <FaUser className={styles["button-icon"]} /> Profile
          </button>
          

          <button
            className={styles["action-button"]}
            onClick={() => navigate("/gamepage")}
          >
            Play Game
          </button>

          <button
            className={styles["action-button"]}
            onClick={() => navigate("/talkhome")}
          >
            Talk with Friends
          </button>
          <button
            className={styles["action-button"]}
            onClick={() => navigate("/invite")}
          >
            Invite Friend
          </button>

          <button
            className={styles["action-button"]}
            onClick={() => navigate("/payment")}
          >
            Payment Center
          </button>
          
          <button
            className={styles["action-button"]}
            onClick={handleLeaderboardClick}
          >
            🏆 Leaderboard
          </button>


        </div>
      </main>

      <footer className={styles["footer-placeholder"]}></footer>
    </div>
  );
};

export default Landing;

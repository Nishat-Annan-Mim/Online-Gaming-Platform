import React from "react";
import styles from "./Landing.module.css"; // ✅ Correct import
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["landing-body"]}>
      <header className={styles["nav-placeholder"]}></header>

      <main className={styles["main-content"]}>
        <div className={styles["button-container"]}>
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
        </div>
      </main>

      <footer className={styles["footer-placeholder"]}></footer>
    </div>
  );
};

export default Landing;

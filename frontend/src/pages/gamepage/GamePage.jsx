import React from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-cover bg-center p-6">
      <div className="backdrop-blur-md bg-white/2 rounded-2xl shadow-lg p-10 flex flex-col items-center">
        <h1 className="text-5xl font-bold mb-12 blink-text">
          <u>Choose Your Game Mode</u>
        </h1>

        <div className="flex flex-col space-y-6 w-full max-w-md">
          <button
            onClick={() => navigate("/tictactoe")}
            className="bg-pink-500 bg-opacity-80 hover:bg-opacity-100 hover:bg-yellow-600 text-white text-2xl font-semibold py-4 rounded-lg transition duration-300"
          >
            Download Game
          </button>
          {/* <button
            onClick={() => window.open("https://www.freegame.gg/", "_blank")}
            className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 hover:bg-red-600 text-white text-2xl font-semibold py-4 rounded-lg transition duration-300"
          >
            Visit FreeGame.gg Website
          </button> */}
          <button
            onClick={() => navigate("/playonlinegame")}
            className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 hover:bg-red-600 text-white text-2xl font-semibold py-4 rounded-lg transition duration-300"
          >
            Play Online Games
          </button>

          <button
            onClick={() => navigate("/matchgame")}
            className="bg-green-500 bg-opacity-80 hover:bg-opacity-100 hover:bg-green-600 text-white text-2xl font-semibold py-4 rounded-lg transition duration-300"
          >
            <div>
              🤖 Match with Computer
              <br />
              (⛰️ Rock, 📄 Paper, ✂️ Scissors)
            </div>
          </button>
          <button
            onClick={() => navigate("/tictactoe")}
            className="bg-purple-500 bg-opacity-80 hover:bg-opacity-100 hover:bg-purple-600 text-white text-2xl font-semibold py-4 rounded-lg transition duration-300"
          >
            Play TicTacToe with Friends
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;

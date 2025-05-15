import { useState } from "react";
import axios from "axios"; // Import axios for making API calls

// const choices = ["rock", "paper", "scissors"];

export default function RockPaperSci() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  async function playGame(choice) {
    try {
      // Set player's choice
      setPlayerChoice(choice);

      // Make the API call to backend to get the game result
      const response = await axios.post("http://localhost:5000/api/game/play", {
        playerChoice: choice,
      });

      const { result, compChoice } = response.data;
      setComputerChoice(compChoice);
      setResult(result);

      // Update the score based on result
      if (result === "You win!") {
        setPlayerScore((prev) => prev + 1);
      } else if (result === "You lose!") {
        setComputerScore((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error in playing the game:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 glass-background">
      <h1 className="text-5xl glow-text mb-8">Rock - Paper - Scissors</h1>

      <div className="flex space-x-6 mb-8">
        <button
          onClick={() => playGame("rock")}
          className="text-7xl bg-blue-500 hover:bg-blue-400 text-white rounded-full p-6 transition duration-300"
        >
          👊
        </button>
        <button
          onClick={() => playGame("paper")}
          className="text-7xl bg-blue-500 hover:bg-blue-400 text-white rounded-full p-6 transition duration-300"
        >
          ✋
        </button>
        <button
          onClick={() => playGame("scissors")}
          className="text-7xl bg-blue-500 hover:bg-blue-400 text-white rounded-full p-6 transition duration-300"
        >
          ✌
        </button>
      </div>

      <div className="text-3xl mb-4">PLAYER: {playerChoice}</div>
      <div className="text-3xl mb-4">COMPUTER: {computerChoice}</div>

      <div
        className={`text-5xl font-bold my-6 ${
          result === "You win!"
            ? "text-green-500"
            : result === "You lose!"
            ? "text-red-500"
            : "text-blue-700"
        }`}
      >
        {result}
      </div>

      <div className="flex space-x-12 text-2xl">
        <div className="flex flex-col items-center">
          <span>Player Score:</span>
          <span className="text-green-500 font-bold">{playerScore}</span>
        </div>

        <div className="flex flex-col items-center">
          <span>Computer Score:</span>
          <span className="text-red-500 font-bold">{computerScore}</span>
        </div>
      </div>
    </div>
  );
}

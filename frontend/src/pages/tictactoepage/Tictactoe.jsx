// import React, { useState, useEffect } from "react";

// const Tictactoe = () => {
//   const [board, setBoard] = useState(Array(9).fill(""));
//   const [currentPlayer, setCurrentPlayer] = useState("X");
//   const [status, setStatus] = useState("X's turn");
//   const [gameOver, setGameOver] = useState(false);

//   const winningCombos = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8], // rows
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8], // columns
//     [0, 4, 8],
//     [2, 4, 6], // diagonals
//   ];

//   const handleClick = (index) => {
//     if (board[index] || gameOver) return;

//     const newBoard = [...board];
//     newBoard[index] = currentPlayer;
//     setBoard(newBoard);
//   };

//   const checkWinner = (newBoard) => {
//     for (let combo of winningCombos) {
//       const [a, b, c] = combo;
//       if (
//         newBoard[a] &&
//         newBoard[a] === newBoard[b] &&
//         newBoard[b] === newBoard[c]
//       ) {
//         return newBoard[a];
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     const winner = checkWinner(board);
//     if (winner) {
//       setStatus(`Player ${winner} wins!`);
//       setGameOver(true);
//     } else if (!board.includes("")) {
//       setStatus("It's a draw!");
//       setGameOver(true);
//     } else {
//       setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
//       setStatus(`${currentPlayer === "X" ? "O's" : "X's"} turn`);
//     }
//   }, [board]);

//   const restartGame = () => {
//     setBoard(Array(9).fill(""));
//     setCurrentPlayer("X");
//     setStatus("X's turn");
//     setGameOver(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen ">
//       <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>
//       <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-lg">
//         {board.map((cell, index) => (
//           <div
//             key={index}
//             onClick={() => handleClick(index)}
//             className="w-20 h-20 flex items-center justify-center text-2xl font-bold border-2 border-gray-300 text-black hover:bg-gray-100 cursor-pointer transition-all duration-200"
//           >
//             {cell}
//           </div>
//         ))}
//       </div>
//       <p className="mt-4 text-xl">{status}</p>
//       <button
//         onClick={restartGame}
//         className="mt-4 px-6 py-2 bg-white text-indigo-600 font-semibold rounded shadow hover:bg-indigo-100 transition"
//       >
//         Restart
//       </button>
//     </div>
//   );
// };

// export default Tictactoe;

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const Tictactoe = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [currentTurn, setCurrentTurn] = useState("X");
//   const [yourSymbol, setYourSymbol] = useState(null);
//   const [status, setStatus] = useState("Connecting...");
//   const [gameOver, setGameOver] = useState(false);
//   const roomId = "room1"; // You can make this dynamic later

//   useEffect(() => {
//     const socket = io("http://localhost:5000");

//     socket.emit("joinRoom", roomId);

//     socket.on("playerAssignment", (symbol) => {
//       setYourSymbol(symbol);
//       setStatus(`You are ${symbol}. Waiting for opponent...`);
//     });

//     socket.on("init", (gameState) => {
//       setBoard(gameState.board);
//       setCurrentTurn(gameState.currentTurn);
//       setStatus(`Game started! ${gameState.currentTurn}'s turn`);
//     });

//     socket.on("playerJoined", () => {
//       setStatus("Another player joined. Game starts!");
//     });

//     socket.on("updateBoard", (gameState) => {
//       setBoard(gameState.board);
//       setCurrentTurn(gameState.currentTurn);

//       const winner = checkWinner(gameState.board);
//       if (winner) {
//         setStatus(`Player ${winner} wins!`);
//         setGameOver(true);
//       } else if (!gameState.board.includes(null)) {
//         setStatus("It's a draw!");
//         setGameOver(true);
//       } else {
//         setStatus(`${gameState.currentTurn}'s turn`);
//       }
//     });

//     socket.on("resetBoard", (gameState) => {
//       setBoard(gameState.board);
//       setCurrentTurn(gameState.currentTurn);
//       setGameOver(false);
//       setStatus(`Game restarted. ${gameState.currentTurn}'s turn`);
//     });

//     socket.on("opponentLeft", () => {
//       setStatus("Opponent left the game.");
//       setGameOver(true);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const checkWinner = (b) => {
//     const patterns = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let [a, b1, c] of patterns) {
//       if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
//         return b[a];
//       }
//     }
//     return null;
//   };

//   const handleClick = (index) => {
//     if (board[index] || gameOver || currentTurn !== yourSymbol) return;
//     const socket = io("http://localhost:5000"); // reinitialize for scope (not ideal)
//     socket.emit("makeMove", { roomId, index });
//   };

//   const handleReset = () => {
//     const socket = io("http://localhost:5000");
//     socket.emit("resetGame", roomId);
//     setGameOver(false);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
//       <h1 className="text-4xl font-bold mb-6">Multiplayer Tic Tac Toe</h1>
//       <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-md">
//         {board.map((cell, index) => (
//           <div
//             key={index}
//             onClick={() => handleClick(index)}
//             className="w-20 h-20 text-black flex items-center justify-center border-2 border-gray-400 text-3xl font-bold hover:bg-gray-200 cursor-pointer transition duration-150 ease-in-out"
//           >
//             {cell}
//           </div>
//         ))}
//       </div>
//       <p className="mt-4 text-lg">{status}</p>
//       {gameOver && (
//         <button
//           onClick={handleReset}
//           className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-100 font-semibold"
//         >
//           Restart Game
//         </button>
//       )}
//     </div>
//   );
// };

// export default Tictactoe;

import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const Tictactoe = () => {
  const socket = useRef(null); // persistent across renders
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [yourSymbol, setYourSymbol] = useState(null);
  const [status, setStatus] = useState("Connecting...");
  const [gameOver, setGameOver] = useState(false);
  const roomId = "room1";

  const checkWinner = (b) => {
    const patterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let [a, b1, c] of patterns) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        return b[a];
      }
    }
    return null;
  };

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.emit("joinRoom", roomId);

    socket.current.on("playerAssignment", (symbol) => {
      setYourSymbol(symbol);
      setStatus(`You are ${symbol}. Waiting for opponent...`);
    });

    socket.current.on("init", (gameState) => {
      setBoard(gameState.board);
      setCurrentTurn(gameState.currentTurn);
      const winner = checkWinner(gameState.board);
      if (winner) {
        setStatus(`Player ${winner} wins!`);
        setGameOver(true);
      } else {
        setStatus(`Game started! ${gameState.currentTurn}'s turn`);
      }
    });

    socket.current.on("playerJoined", () => {
      setStatus("Opponent joined. Game starting...");
    });

    socket.current.on("updateBoard", (gameState) => {
      setBoard(gameState.board);
      setCurrentTurn(gameState.currentTurn);

      const winner = checkWinner(gameState.board);
      if (winner) {
        setStatus(`Player ${winner} wins!`);
        setGameOver(true);
      } else if (!gameState.board.includes(null)) {
        setStatus("It's a draw!");
        setGameOver(true);
      } else {
        setStatus(`${gameState.currentTurn}'s turn`);
      }
    });

    socket.current.on("resetBoard", (gameState) => {
      setBoard(gameState.board);
      setCurrentTurn(gameState.currentTurn);
      setGameOver(false);
      setStatus(`Game restarted. ${gameState.currentTurn}'s turn`);
    });

    socket.current.on("opponentLeft", () => {
      setStatus("Opponent left the game.");
      setGameOver(true);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  const handleClick = (index) => {
    if (!yourSymbol || gameOver || board[index] || currentTurn !== yourSymbol)
      return;
    socket.current.emit("makeMove", { roomId, index });
  };

  const handleReset = () => {
    socket.current.emit("resetGame", roomId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <h1 className="text-4xl font-bold mb-6">Multiplayer Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg shadow-md">
        {board.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 text-black flex items-center justify-center border-2 border-gray-400 text-3xl font-bold hover:bg-gray-200 cursor-pointer transition duration-150 ease-in-out"
          >
            {cell}
          </div>
        ))}
      </div>
      <p className="mt-8 text-lg">{status}</p>

      {gameOver && (
        <button
          onClick={handleReset}
          className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded shadow hover:bg-indigo-100 font-semibold"
        >
          Restart Game
        </button>
      )}
    </div>
  );
};

export default Tictactoe;

// email korar age:
//TICTACTOE ER AGE :
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import emailRoutes from "./routes/email.routes.js"; // Import the email routes
// import gameRoutes from "./routes/game.routes.js"; // Import the game routes

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// dotenv.config();

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

// app.use(express.json()); //to parse the incoming request with json payloads from request.body
// app.use(cookieParser()); //to parse the incoming request with cookies

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// app.use("/api/email", emailRoutes); // Add this line to use the email routes
// app.use("/api/game", gameRoutes); // Add this line to use the game routes
// // app.get("/",(req,res) => {
// //     //root route http://localhost:5000/
// //     res.send("hello world");
// // });

// app.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`server Running on ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import emailRoutes from "./routes/email.routes.js";
import gameRoutes from "./routes/game.routes.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import playOnlineGameRoutes from "./routes/playonlinegame.routes.js"; // Import the play online game routes
import downloadGameRoutes from "./routes/downloadgame.routes.js"; // Import the download game routes
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import reviewRoutes from "./routes/review.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Setup HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust if frontend URL differs
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// --- Multiplayer Game Room Logic ---
let gameRooms = {}; // { roomId: { board: [...], currentTurn: "X", players: [] } }

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle player joining a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);

    if (!gameRooms[roomId]) {
      gameRooms[roomId] = {
        board: Array(9).fill(null),
        currentTurn: "X",
        players: [],
      };
    }

    // Assign the player symbol ('X' or 'O')
    const playerSymbol = gameRooms[roomId].players.length === 0 ? "X" : "O";
    gameRooms[roomId].players.push({ id: socket.id, symbol: playerSymbol });

    // Emit player assignment
    socket.emit("playerAssignment", playerSymbol);

    // Emit initial game state to the player who joined
    socket.emit("init", gameRooms[roomId]);

    // Notify the other player that a new player has joined
    socket.to(roomId).emit("playerJoined");

    // Log the current players in the room
    console.log("Players in room", roomId, gameRooms[roomId].players);
  });

  // Handle making a move
  socket.on("makeMove", ({ roomId, index }) => {
    const room = gameRooms[roomId];
    if (!room || room.board[index] !== null) return;

    // Update the board
    room.board[index] = room.currentTurn;

    // Switch turn
    room.currentTurn = room.currentTurn === "X" ? "O" : "X";

    // Emit the updated board to all players in the room
    io.to(roomId).emit("updateBoard", room);

    // Check for winner or draw
    const winner = checkWinner(room.board);
    if (winner) {
      io.to(roomId).emit("gameOver", `Player ${winner} wins!`);
    } else if (!room.board.includes(null)) {
      io.to(roomId).emit("gameOver", "It's a draw!");
    }
  });

  // Handle game reset
  socket.on("resetGame", (roomId) => {
    if (!gameRooms[roomId]) return;

    // Reset the board and turn
    gameRooms[roomId].board = Array(9).fill(null);
    gameRooms[roomId].currentTurn = "X";

    // Emit the reset game state to all players
    io.to(roomId).emit("resetBoard", gameRooms[roomId]);
  });

  // Handle player disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Optional: Handle player disconnection logic (e.g., remove player from game)
    for (const roomId in gameRooms) {
      const room = gameRooms[roomId];
      room.players = room.players.filter((player) => player.id !== socket.id);

      // If both players are disconnected, reset the room
      if (room.players.length === 0) {
        delete gameRooms[roomId];
      }
    }
  });
});

// --- Helper Function to Check Winner ---
function checkWinner(board) {
  const patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let [a, b, c] of patterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return 'X' or 'O' as the winner
    }
  }
  return null;
}

// --- Middleware and Routes ---
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/playonlinegame", playOnlineGameRoutes);
app.use("/api/downloadgame", downloadGameRoutes); // Add this line to use the download game routes
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the server with Socket.IO support
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`✅ Server running on port ${PORT}`);
});

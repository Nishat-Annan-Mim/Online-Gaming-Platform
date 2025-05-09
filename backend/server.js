import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import emailRoutes from "./routes/email.routes.js"; // Import the email routes

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); //to parse the incoming request with json payloads from request.body
app.use(cookieParser()); //to parse the incoming request with cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use("/api/email", emailRoutes); // Add this line to use the email routes
// app.get("/",(req,res) => {
//     //root route http://localhost:5000/
//     res.send("hello world");
// });

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server Running on ${PORT}`);
});

// email korar age:
// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";

// import authRoutes from "./routes/auth.routes.js";
// import messageRoutes from "./routes/message.routes.js";
// import userRoutes from "./routes/user.routes.js";

// import connectToMongoDB from "./db/connectToMongoDB.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// dotenv.config();

// app.use(express.json()); //to parse the incoming request with json payloads from request.body
// app.use(cookieParser()); //to parse the incoming request with cookies

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

// // app.get("/",(req,res) => {
// //     //root route http://localhost:5000/
// //     res.send("hello world");
// // });

// app.listen(PORT, () => {
//   connectToMongoDB();
//   console.log(`server Running on ${PORT}`);
// });

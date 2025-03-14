import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { login } from "./controllers/auth.controller.js";

import path from "path";
import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const router = express.Router();
router.post("/login", login);
export default router;

const PORT = process.env.PORT || 5174;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: [
    "http://localhost:5173"
  ],
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

// ✅ Handle Preflight Requests
app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "public", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log("server is running on PORT:", PORT);
  connectDB();
});

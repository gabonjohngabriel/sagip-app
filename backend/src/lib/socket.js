import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5002"],
    credentials: true,
  },
});

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    // Send updated online users list to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  // Handle when user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    
    // Direct deletion using userId (more efficient approach)
    if (userId) {
      delete userSocketMap[userId];
    } else {
      // Fallback to original approach if userId is not available
      for (const [key, value] of Object.entries(userSocketMap)) {
        if (value === socket.id) {
          delete userSocketMap[key];
          break;
        }
      }
    }
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// Function to get a specific receiver's socket id
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

export { app, io, server, getReceiverSocketId };
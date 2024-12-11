import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("join-room", (room) => {
    console.log("joined room");
    socket.join(room);
    io.to(room).emit("join-room", "A new user joined the room! ");
  });

  socket.on("keystroke", (keyEvent, room) => {
    if (room) {
      console.log(keyEvent);
      io.to(room).emit("keystroke", keyEvent);
    }
  });

  socket.on("keep-alive", (message, room) => {
    console.log("keep alive received");
    io.to(room).emit("keep-alive", "pong");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

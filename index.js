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
const PORT = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  let socketRoom = null; //this code works because we assume each connection will only have one room
  socket.on("join-room", (room) => {
    console.log("message from", socket.id);
    console.log("room: ", room);
    socket.join(room);
    // Check if the socket is in the room by accessing socket.rooms
    if (socket.rooms.has(room)) {
      console.log(`Socket ${socket.id} successfully joined room ${room}`);
    } else {
      console.log(`Socket ${socket.id} failed to join room ${room}`);
    }
    const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;
    console.log(`Number of clients in room ${room}:`, roomSize);
    socketRoom = room;
    io.to(room).emit("room-status", "A new user joined the room! ");
  });

  socket.on("disconnect", () => {
    if (socketRoom) {
      io.to(socketRoom).emit("room-status", "User disconnected ");
    }
  });

  socket.on("keystroke", (keyEvent, room) => {
    if (room) {
      io.to(room).emit("keystroke", keyEvent);
    }
  });

  socket.on("keep-alive", (message, room) => {
    io.to(room).emit("keep-alive", "pong");
  });
});

server.listen(PORT, () => {
  console.log("server running at ", PORT);
});

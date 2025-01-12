import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import path from "path";
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
const buildPath = path.join(__dirname, "web-client/dist");

app.use(express.static(buildPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`new connection: ${socket.id}`);
  let socketRoom = null; //this code works because we assume each connection will only have one room
  socket.on("join-room", (room) => {
    console.log("message from", socket.id);
    console.log("room: ", room);
    socket.join(room);
    if (socket.rooms.has(room)) {
      console.log(`Socket ${socket.id} successfully joined room ${room}`);
    } else {
      console.log(`Socket ${socket.id} failed to join room ${room}`);
    }
    const roomSize = io.sockets.adapter.rooms.get(room)?.size || 0;
    console.log(`Number of clients in room ${room}:`, roomSize);
    socketRoom = room;
    io.to(room).emit("room-status", {
      message: "A new user joined the room! ",
      newUser: true,
      numberOfUsers: roomSize,
      roomId: socketRoom,
    });
    console.log("connection received");
  });

  socket.on("keystroke", (keyEvent, room) => {
    if (room) {
      io.to(room).emit("keystroke", keyEvent);
    }
  });

  socket.on("keep-alive", (message, room) => {
    io.to(room).emit("keep-alive", "pong");
  });

  socket.on("kill-session", (room) => {
    if (room) {
      io.to(room).emit("kill-session");
      console.log("kill-session triggered");
    }
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
    if (socketRoom && socket.id == socketRoom) {
      io.to(socketRoom).emit("kill-session"); //todo @euan this doesn't work
    } else if (socketRoom) {
      io.to(socketRoom).emit("room-status", {
        message: "User disconnected ",
        userDisconnected: true,
        roomId: socketRoom,
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("server running at ", PORT);
});

console.log("sheesh the dish");

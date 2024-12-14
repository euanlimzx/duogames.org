import { io } from "socket.io-client";
const URL = "http://localhost:3000";
// const URL = "https://socketio-server-do5e.onrender.com/";
export const socket = io(URL, {
  autoConnect: false,
});

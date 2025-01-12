import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
console.log("Socket server is, ", URL);
export const socket = io(URL, {
  autoConnect: false,
});

import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  socket = io("http://localhost:4000");

  socket.emit("register", userId);

  return socket;
};

export const getSocket = () => socket;
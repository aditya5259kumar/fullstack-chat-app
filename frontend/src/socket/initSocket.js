import { io } from "socket.io-client";

const socket = io("https://fullstack-chat-app-h4rd.onrender.com", {
  autoConnect: false,
});

socket.on("connect_error", (err) => {
  console.log("Socket error:", err.message);
});

export const connectSocket = () => {
  if (!socket.connected) {
    // UPDATED: Manually set the token right before connecting
    const token = localStorage.getItem("token");
    if (token) {
      socket.auth = { token };
      socket.connect();
    }
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket manually disconnected");
  }
};

export default socket;

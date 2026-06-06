import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let onlineUsers = new Map();

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  //socket middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error("Unauthorized"));
      }

      const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = verifyToken;

      next();
    } catch (err) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.user.id;

    // ✅ Add user to onlineUsers
    if (!onlineUsers.has(userId)) {
      onlineUsers.set(userId, new Set());
    }

    onlineUsers.get(userId).add(socket.id);

    io.emit("get_online_users", Array.from(onlineUsers.keys()));

    // 2. Room Management
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
    });

    socket.on("leave_conversation", (conversationId) => {
      socket.leave(`conversation_${conversationId}`);
    });

    // 3. Typing
    // Typing Start
    socket.on("typing_start", ({ conversationId }) => {
      socket.to(`conversation_${conversationId}`).emit("display_typing", {
        conversationId,
      });
    });

    // Emit to the specific user who just connected
    socket.emit("get_online_users", Array.from(onlineUsers.keys()));

    // Emit to everyone else that a new user is online
    io.emit("get_online_users", Array.from(onlineUsers.keys()));

    // Typing Stop
    socket.on("typing_stop", ({ conversationId }) => {
      socket.to(`conversation_${conversationId}`).emit("hide_typing", {
        conversationId,
      });
    });

    // 4. Disconnect
    socket.on("disconnect", () => {
      const sockets = onlineUsers.get(userId);

      if (sockets) {
        sockets.delete(socket.id);

        if (sockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }

      io.emit("get_online_users", Array.from(onlineUsers.keys()));
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

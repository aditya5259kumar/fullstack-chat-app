// import { Server } from "socket.io";
// import initModels from "../models/init-models.js";
// import sequelize from "../config/db.js";

// const { messages: messagesModel } = initModels(sequelize);

// export const initSocket = (server) => {
//   const io = new Server(server, {
//     cors: {
//       origin: process.env.CLIENT_URL,
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     // ✅ join conversation room
//     socket.on("join_conversation", (conversationId) => {
//       socket.join(`conversation_${conversationId}`);
//       console.log(`Joined conversation_${conversationId}`);
//     });

//     // ✅ send message
//     socket.on("send_message", async (data) => {
//       try {
//         const { conversation_id, sender_id, content } = data;

//         if (!conversation_id || !sender_id || !content) return;

//         // save to DB
//         const message = await messagesModel.create({
//           conversation_id,
//           sender_id,
//           content,
//         });

//         // emit to room
//         io.to(`conversation_${conversation_id}`).emit("receive_message", {
//           id: message.id,
//           conversation_id,
//           sender_id,
//           content,
//           created_at: message.created_at,
//         });
//       } catch (err) {
//         console.log("Socket error:", err.message);
//       }
//     });

//     socket.on("leave_conversation", (conversationId) => {
//       socket.leave(`conversation_${conversationId}`);
//       console.log(`Left conversation_${conversationId}`);
//     });

//     socket.on("disconnect", () => {
//       console.log("User disconnected:", socket.id);
//     });
//   });

//   return io;
// };

import { Server } from "socket.io"; // <--- THIS WAS MISSING
import initModels from "../models/init-models.js";
import sequelize from "../config/db.js";

const { messages: messagesModel } = initModels(sequelize);

let onlineUsers = {}; // Stores { userId: socketId }

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 1. Online Status Logic
    socket.on("register_user", (userId) => {
      onlineUsers[userId] = socket.id;
      // Broadcast current online user IDs to everyone
      io.emit("get_online_users", Object.keys(onlineUsers));
    });

    // 2. Room Management
    socket.on("join_conversation", (conversationId) => {
      socket.join(`conversation_${conversationId}`);
      console.log(`User joined room: conversation_${conversationId}`);
    });

    // 3. Typing Status Logic
    socket.on("typing_start", (data) => {
      // Send only to the specific receiver
      const receiverSocketId = onlineUsers[data.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("display_typing", {
          conversationId: data.conversationId,
        });
      }
    });

    socket.on("typing_stop", (data) => {
      const receiverSocketId = onlineUsers[data.receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("hide_typing", {
          conversationId: data.conversationId,
        });
      }
    });

    // 4. Disconnect Logic
    socket.on("disconnect", () => {
      // Remove user from onlineUsers map
      for (const [userId, socketId] of Object.entries(onlineUsers)) {
        if (socketId === socket.id) {
          delete onlineUsers[userId];
          break;
        }
      }
      io.emit("get_online_users", Object.keys(onlineUsers));
      console.log("User disconnected");
    });
  });

  return io;
};
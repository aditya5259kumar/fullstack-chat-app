import sequelize from "../config/db.js";
import fs from "fs";
import path from "path";
import { Op } from "sequelize";
import model from "../models/index.js";
import bcrypt from "bcrypt";
const userModel = model.users;
const participantsModel = model.participants;
const conversationsModel = model.conversations;
const messagesModel = model.messages;
import { getUserSockets } from "../socket/initSocket.js";

const userController = {
  //--------myProfile---------
  myProfile: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await userModel.findOne({
        where: { id: userId },
        attributes: [
          "id",
          "name",
          "username",
          "email",
          "profile_photo",
          "bio",
          "created_at",
          "updated_at",
        ],
      });

      if (!user) {
        return res.status(400).json({ message: "user not found!" });
      }

      return res
        .status(200)
        .json({ message: "user profile fetched successfully!", user });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "something went wrong!", error: error });
    }
  },

  //--------other users Profile---------
  usersProfile: async (req, res) => {
    try {
      const userId = req.params.userId;

      const user = await userModel.findOne({
        where: { id: userId },
        attributes: [
          "id",
          "name",
          "username",
          "profile_photo",
          "bio",
          "created_at",
        ],
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      return res
        .status(200)
        .json({ message: "user profile fetched successfully!", user });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "something went wrong!", error: error });
    }
  },

  //--------edit Profile---------
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, username, bio } = req.body;

      const user = await userModel.findByPk(userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found!",
        });
      }

      // Username uniqueness check
      if (username && username !== user.username) {
        const existingUser = await userModel.findOne({
          where: {
            username,
            id: {
              [Op.ne]: userId,
            },
          },
        });

        if (existingUser) {
          return res.status(409).json({
            message: "Username already exists!",
          });
        }
      }

      let profilePhoto = user.profile_photo;

      // Handle new profile photo upload
      if (req.file) {
        console.log("New file uploaded:", req.file.filename);
        console.log("Old photo in DB:", user.profile_photo);

        // Delete old photo
        if (user.profile_photo) {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            "uploads",
            user.profile_photo,
          );

          console.log("Deleting:", oldImagePath);
          console.log("Exists:", fs.existsSync(oldImagePath));

          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log("Old image deleted successfully");
          }
        }

        profilePhoto = req.file.filename;
      }

      await user.update({
        name: name ?? user.name,
        username: username ?? user.username,
        bio: bio ?? user.bio,
        profile_photo: profilePhoto,
      });

      return res.status(200).json({
        message: "User profile updated successfully!",
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          profile_photo: user.profile_photo,
          bio: user.bio,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  },

  //--------all user---------
  allUser: async (req, res) => {
    try {
      const id = req.user.id;

      const users = await userModel.findAll({
        where: {
          id: {
            [Op.ne]: id,
          },
        },
        attributes: ["id", "username", "name", "profile_photo"],
      });

      return res
        .status(200)
        .json({ message: "users fetched successfully!", users });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "something went wrong!", error: error.message });
    }
  },

  //--------search user---------
  findUser: async (req, res) => {
    try {
      const id = req.user.id;
      const query = req.query.query;

      if (!query) {
        return res.status(400).json({ message: "Query is required" });
      }

      const users = await userModel.findAll({
        where: {
          username: {
            [Op.like]: `%${query}%`,
          },
          id: {
            [Op.ne]: id,
          },
        },
        attributes: ["id", "username", "name", "profile_photo"],
        limit: 10,
      });

      return res
        .status(200)
        .json({ message: "users fetched successfully!", users });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "something went wrong!", error: error.message });
    }
  },

  //--------get/create conversation---------
  findConversation: async (req, res) => {
    try {
      const currentUserId = req.user.id;
      const targetUserId = req.params.id;

      if (currentUserId === targetUserId) {
        return res
          .status(400)
          .json({ message: "You cannot chat with yourself" });
      }

      // Step 1: Find conversation where BOTH users exist
      const existingConversation = await participantsModel.findAll({
        attributes: ["conversation_id"],
        where: {
          user_id: [currentUserId, targetUserId],
        },
        group: ["conversation_id"],
        having: sequelize.literal("COUNT(DISTINCT user_id) = 2"),
      });

      let conversation;

      if (existingConversation.length > 0) {
        // Conversation exists
        conversation = existingConversation[0].conversation_id;
      } else {
        // Step 2: Create new conversation
        const newConversation = await conversationsModel.create({
          type: "private",
        });

        // Step 3: Add participants
        await participantsModel.bulkCreate([
          {
            conversation_id: newConversation.id,
            user_id: currentUserId,
          },
          {
            conversation_id: newConversation.id,
            user_id: targetUserId,
          },
        ]);

        conversation = newConversation.id;
      }

      return res.status(200).json({
        message: "Conversation ready",
        conversation_id: conversation,
      });
    } catch (error) {
      return res.status(400).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  },

  //--------send messages---------
  sendMessage: async (req, res) => {
    try {
      const senderId = req.user.id;
      const { conversation_id, content } = req.body;

      if (!conversation_id || !content) {
        return res.status(400).json({ message: "Missing fields" });
      }

      // Step 1: Check if user is part of this conversation
      const participant = await participantsModel.findOne({
        where: {
          conversation_id,
          user_id: senderId,
        },
      });

      if (!participant) {
        return res.status(403).json({
          message: "You are not part of this conversation",
        });
      }

      // Step 2: Save raw message
      const rawMessage = await messagesModel.create({
        conversation_id,
        sender_id: senderId,
        content,
        status: "sent",
      });

      // Restore conversation for participants who had deleted it
      await participantsModel.update(
        {
          deleted_at: null,
        },
        {
          where: {
            conversation_id,
          },
        },
      );

      // Step 3: Fetch the newly created message WITH the sender data
      // This ensures the frontend gets the exact same format as getMessages
      const populatedMessage = await messagesModel.findOne({
        where: { id: rawMessage.id },
        include: [
          {
            model: userModel,
            as: "sender",
            attributes: ["id", "name", "profile_photo"],
          },
        ],
      });

      // Step 4: Broadcast to users already inside the chat room
      if (req.io) {
        req.io
          .to(`conversation_${conversation_id}`)
          .emit("receive_message", populatedMessage);
      }

      // Step 5: Notify participants who are not currently in room
      const participants = await participantsModel.findAll({
        where: {
          conversation_id,
        },
      });

      const receiver = participants.find((p) => p.user_id !== senderId);

      if (receiver) {
        const receiverSockets = getUserSockets(receiver.user_id);

        if (receiverSockets) {
          receiverSockets.forEach((socketId) => {
            req.io.to(socketId).emit("new_conversation_message", {
              conversation_id,
              message: populatedMessage,
            });
          });
        }
      }

      return res.status(200).json({
        message: "Message sent successfully.",
        data: populatedMessage,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  },

  //--------mark messages as seen---------
  markAsSeen: async (req, res) => {
    try {
      const userId = req.user.id;
      const { conversationId } = req.params;

      const [updatedRows] = await messagesModel.update(
        {
          status: "seen",
        },
        {
          where: {
            conversation_id: conversationId,
            status: "sent",
            sender_id: {
              [Op.ne]: userId,
            },
          },
        },
      );

      const participants = await participantsModel.findAll({
        where: {
          conversation_id: conversationId,
        },
      });

      const sender = participants.find((p) => p.user_id !== userId);

      console.log("Emitting messages_seen", sender.user_id);

      if (sender) {
        const senderSockets = getUserSockets(sender.user_id);

        if (senderSockets) {
          senderSockets.forEach((socketId) => {
            req.io.to(socketId).emit("messages_seen", {
              conversationId,
            });
          });
        }
      }

      console.log("Seen API called", conversationId, updatedRows);

      return res.status(200).json({
        message: "Messages marked as seen",
        updated: updatedRows,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  //--------get messages---------
  getMessages: async (req, res) => {
    try {
      const userId = req.user.id;
      const { conversationId } = req.params;

      // 1. Check if user belongs to conversation
      const participant = await participantsModel.findOne({
        where: {
          conversation_id: conversationId,
          user_id: userId,
        },
      });

      if (!participant) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      // 2. Get participants with USER (FIX: added alias)
      const participants = await participantsModel.findAll({
        where: { conversation_id: conversationId },
        include: [
          {
            model: userModel,
            as: "user", // ✅ REQUIRED (this fixes your error)
            attributes: ["id", "name", "profile_photo"],
          },
        ],
      });

      // 3. Get OTHER USER
      const otherUser =
        participants.find((p) => p.user_id !== userId)?.user || null;

      // 4. Fetch messages (this part was already correct)
      const messages = await messagesModel.findAll({
        where: { conversation_id: conversationId },
        order: [["created_at", "ASC"]],
        include: [
          {
            model: userModel,
            as: "sender", // ✅ already correct
            attributes: ["id", "name", "profile_photo"],
          },
        ],
      });

      // 5. Final response
      return res.status(200).json({
        message: "Messages fetched successfully.",
        data: messages,
        other_user: otherUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  },

  //--------get inbox users conversation---------
  getUserConversations: async (req, res) => {
    try {
      const userId = req.user.id;
      const search = req.query.search?.trim().toLowerCase();

      const conversations = await conversationsModel.findAll({
        include: [
          {
            model: participantsModel,
            as: "participants",
            include: [
              {
                model: userModel,
                as: "user",
                attributes: ["id", "username", "name", "profile_photo"],
              },
            ],
          },
          {
            model: messagesModel,
            as: "messages",
            attributes: ["content", "created_at", "sender_id", "status"],
            limit: 1,
            order: [["created_at", "DESC"]],
          },
        ],
      });

      const filteredConversations = conversations.filter((c) =>
        c.participants.some((p) => p.user_id === userId && !p.deleted_at),
      );

      const result = await Promise.all(
        filteredConversations.map(async (c) => {
          const otherUsers = c.participants
            .filter((p) => p.user_id !== userId)
            .map((p) => p.user);

          const lastMessage = c.messages?.[0];

          let lastMessagePreview = null;

          if (lastMessage) {
            const isCurrentUserSender = lastMessage.sender_id === userId;

            if (isCurrentUserSender) {
              lastMessagePreview = `You: ${lastMessage.content.substring(
                0,
                50,
              )}${lastMessage.content.length > 50 ? "..." : ""}`;
            } else {
              const sender = c.participants.find(
                (p) => p.user_id === lastMessage.sender_id,
              );

              const senderName = sender?.user?.name || "Someone";

              lastMessagePreview = `${senderName}: ${lastMessage.content.substring(
                0,
                50,
              )}${lastMessage.content.length > 50 ? "..." : ""}`;
            }
          } else {
            lastMessagePreview = "No messages yet";
          }

          const unreadCount = await messagesModel.count({
            where: {
              conversation_id: c.id,
              status: "sent",
              sender_id: {
                [Op.ne]: userId,
              },
            },
          });

          return {
            conversation_id: c.id,
            users: otherUsers,
            last_message_preview: lastMessagePreview,
            last_message_time: lastMessage?.created_at || null,
            last_message_sender_id: lastMessage?.sender_id || null, // add this
            last_message_status: lastMessage?.status || null, // add this
            unread_count: unreadCount,
          };
        }),
      );

      result.sort((a, b) => {
        return (
          new Date(b.last_message_time || 0) -
          new Date(a.last_message_time || 0)
        );
      });
      let finalResult = result;

      if (search) {
        finalResult = result.filter((conversation) =>
          conversation.users.some(
            (user) =>
              user.name?.toLowerCase().includes(search) ||
              user.username?.toLowerCase().includes(search),
          ),
        );
      }

      return res.status(200).json({
        message: "Conversations fetched",
        data: finalResult,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  },

  //--------delete user account---------
  deleteAccount: async (req, res) => {
    try {
      const userId = req.user.id;
      const { password } = req.body;

      if (!password) {
        return res.status(400).json({
          message: "Current password is required",
        });
      }

      const user = await userModel.findOne({
        where: { id: userId },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Incorrect password",
        });
      }

      await userModel.destroy({
        where: {
          id: userId,
        },
      });

      return res.status(200).json({
        message: "User deleted successfully!",
        userId,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: error.message,
      });
    }
  },

  //--------delete user conversation ---------
  deleteConversation: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { conversationId } = req.params;
      const userId = req.user.id;

      // 1. Soft delete current user
      const [updatedRows] = await participantsModel.update(
        {
          deleted_at: new Date(),
        },
        {
          where: {
            conversation_id: conversationId,
            user_id: userId,
            deleted_at: null,
          },
          transaction,
        },
      );

      if (updatedRows === 0) {
        throw new Error("Nothing updated. Check userId or conversationId.");
      }

      // 2. Check remaining active participants
      const remaining = await participantsModel.count({
        where: {
          conversation_id: conversationId,
          deleted_at: null,
        },
        transaction,
      });

      // 3. Hard delete if no one left
      if (remaining === 0) {
        await messagesModel.destroy({
          where: { conversation_id: conversationId },
          transaction,
        });

        await participantsModel.destroy({
          where: { conversation_id: conversationId },
          transaction,
        });

        await conversationsModel.destroy({
          where: { id: conversationId },
          transaction,
        });
      }

      await transaction.commit();

      return res.status(200).json({
        message:
          remaining === 0
            ? "Conversation permanently deleted"
            : "Conversation removed from inbox",
      });
    } catch (error) {
      await transaction.rollback();

      return res.status(500).json({
        message: error.message,
      });
    }
  },
};

export default userController;

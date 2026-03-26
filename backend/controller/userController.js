import sequelize, { Op } from "sequelize";
import model from "../models/index.js";
const userModel = model.users;
const participantsModel = model.participants;
const conversationsModel = model.conversations;
const messagesModel = model.messages;

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

  //--------search user---------
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

      console.log("req.user:===============", req.user.toJSON());

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

      // Step 2: Save message
      const message = await messagesModel.create({
        conversation_id,
        sender_id: senderId,
        content,
      });

      return res.status(200).json({
        message: "Message sent successfully.",
        data: message,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong!",
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
            attributes: ["content", "created_at"],
            limit: 1,
            order: [["created_at", "DESC"]],
          },
        ],
      });

      const result = conversations
        // ✅ only conversations where current user exists
        .filter((c) => c.participants.some((p) => p.user_id === userId))

        // ✅ format response
        .map((c) => {
          const otherUsers = c.participants
            .filter((p) => p.user_id !== userId)
            .map((p) => p.user);

          return {
            conversation_id: c.id,
            users: otherUsers, // ✅ array (future-proof for group chat)
            last_message: c.messages?.[0]?.content || null,
            last_message_time: c.messages?.[0]?.created_at || null,
          };
        });

      return res.status(200).json({
        message: "Conversations fetched",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  },
};

export default userController;

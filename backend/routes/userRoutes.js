import express from "express";
import userController from "../controller/userController.js";
import authenticateUser from "../middleware/authenticateUser.js";

const router = express.Router();

router.get("/profile", authenticateUser, userController.myProfile);
router.get("/users", authenticateUser, userController.allUser);
router.get("/search", authenticateUser, userController.findUser);
router.get(
  "/find-convo/:id",
  authenticateUser,
  userController.findConversation,
);
router.post("/send-message", authenticateUser, userController.sendMessage);
router.get(
  "/messages/:conversationId",
  authenticateUser,
  userController.getMessages,
);

router.get(
  "/conversations",
  authenticateUser,
  userController.getUserConversations,
);

export default router;

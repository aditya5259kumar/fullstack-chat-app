import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

// signUp
router.post("/signup", authController.signUp);

// logIn
router.post("/login", authController.logIn);

export default router;

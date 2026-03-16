import models from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userModel = models.users;

const authController = {
  //--------signUp---------
  signUp: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      if (!name || !username || !email || !password) {
        return res.status(400).json({ message: "all fields are required!" });
      }

      const existingEmail = await userModel.findOne({
        where: { email: email },
      });

      const existingUsername = await userModel.findOne({
        where: { username: username },
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "user with this email already exist!",
        });
      }

      if (existingUsername) {
        return res.status(400).json({
          message: "user with this username already exist!",
        });
      }

      const hashPassword = await bcrypt.hash(password, 12);

      const user = await userModel.create({
        name: name,
        username: username,
        email: email,
        password: hashPassword,
      });

      const token = jwt.sign(
        { id: user.id, email: email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.status(201).json({
        message: "user created successfully",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong!",
        error: error.message,
      });
    }
  },

  //--------logIn---------
  logIn: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "all fields are required!" });
      }

      const user = await userModel.findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(400).json({
          message: "invalid credentials!",
        });
      }

      const hashPassword = await bcrypt.compare(password, user.password);

      if (!hashPassword) {
        return res.status(400).json({
          message: "invalid credentials!",
        });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      res.status(200).json({
        message: "user logged-in successfully",
        token,
      });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong!",
        error: error.message,
      });
    }
  },
};

export default authController;

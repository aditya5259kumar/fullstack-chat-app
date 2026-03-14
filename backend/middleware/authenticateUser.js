import jwt from "jsonwebtoken";
import models from "../models/index.js";
const userModel = models.users;

async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // console.log(
    //   "req.header.authorization------------------",
    //   req.headers.authorization,
    // );

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "token missing or invalid!",
      });
    }

    const bearer = authHeader.split(" ");
    // console.log("bearer------------------", bearer);

    const token = bearer[1];
    console.log("token------------------", token);

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      where: { email: verifyToken.email },
    });

    console.log("user--------------------", user);

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({
      message: "token missing or invalid!",
      error: error,
    });
  }
}

export default authenticateUser;

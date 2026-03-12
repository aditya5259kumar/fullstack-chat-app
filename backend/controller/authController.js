import models from "../models/index.js";
const userModel = models.users;

const authController = {
  //--------signup---------
  signUp: async (req, res) => {
    try {
      const { name, username, email, password } = req.body;

      if (!name || !username || !email || !password) {
        return res.status(400).json({ message: "all fields are required!" });
      }

      const user = await userModel.create({
        name: name,
        username: username,
        email: email,
        password: password,
      });

      res.status(201).json({ message: "user created successfully", user });
    } catch (error) {
      return res.status(400).json({
        message: "something went wrong!",
        error: error.message,
      });
    }
  },
};

export default authController;

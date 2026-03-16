import model from "../models/index.js";
const userModel = model.users;

const userController = {
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
};

export default userController;

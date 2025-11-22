const createToken = require("../helpers/create-token");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const UserController = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      const token = createToken(newUser._id, newUser.role);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        success: true,
        message: "Registered successfully",
        data: newUser,
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = createToken(user._id, user.role);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ success: true, message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  info: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = UserController;

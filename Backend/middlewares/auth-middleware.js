const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const auth = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    try {
      const user = await User.findById(decodedToken._id).select("-password");

      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  });
};

module.exports = auth;

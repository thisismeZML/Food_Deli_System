const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
require("dotenv").config();

(async () => {
    await mongoose.connect(process.env.MONGODB_URI);

    const exists = await User.findOne({ role: "admin" });
    if (!exists) {
        const hashed = await bcrypt.hash("admin123", 10);
        await User.create({
            username: "admin",
            email: "admin@gmail.com",
            password: hashed,
            role: "admin"
        });

        console.log("Admin created!");
    } else {
        console.log("Admin already exists.");
    }

    process.exit();
})();

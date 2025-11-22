const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const auth = require("../middlewares/auth-middleware");
const role = require("../middlewares/role-middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/info", auth, role("admin"), userController.info);

module.exports = router;

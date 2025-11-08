const express = require("express");
const router = express.Router();
const User = require("../models/User");
const userController = require("../controllers/userController");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

router.put("/:userId", userController.update_user);

module.exports = router;

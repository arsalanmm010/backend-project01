const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Todo = require("../models/todo");

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const todo = new Todo({ title, description, user: user._id });
    await todo.save();
    res.status(201).json({ message: "Todo item created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo item" });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const todos = await Todo.find({ user: user._id });
    res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve todo items" });
  }
});

module.exports = router;

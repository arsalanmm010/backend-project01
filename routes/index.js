const express = require("express");
const router = express.Router();
const authRoutes = require("./auth");
const todoRoutes = require("./todo");

router.use("/resgister", authRoutes);
router.use("/login", authRoutes);
router.use("/todos", todoRoutes);

module.exports = router;

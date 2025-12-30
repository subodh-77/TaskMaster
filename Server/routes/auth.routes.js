const express = require('express');
const router = express.Router();

// Consolidate these into one line
const { registerUser, loginUser, getMe } = require("../controllers/auth.controller");

// This MUST match the module.exports in auth.middleware.js
const authMiddleware = require("../middleware/auth.middleware");

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Line 14 - If authMiddleware is a function, this won't crash
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Protected", userId: req.user.userId });
});

router.get('/me', authMiddleware, getMe);

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

router.post("/", auth, createTask);
router.get("/", auth, getMyTasks);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;

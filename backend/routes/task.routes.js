// server/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
} = require("../controllers/task.controllers.js");
router.post("/reorder", reorderTasks);
// Routes
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

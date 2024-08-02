const express = require("express");
const router = express.Router();

const { createTask , showTask, updateStatus, deleteTask } = require("../controllers/task.controller");

router.post("/create-task", createTask);
router.get("/show-tasks", showTask);
router.patch("/update-status/:id", updateStatus);
router.delete("/delete-tasks/:id", deleteTask);

module.exports = router;
const Task = require("../models/task.model");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const createTask = await Task.create({title, description});

    res
      .status(200)
      .json({ success: true, message: "task created", createTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal issue" });
  }
};

exports.showTask = async (req, res) => {
  try {
    const alltasks = await Task.find({});

    res.status(200).json({ success: true, message: "all task", alltasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal issue" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task status updated", updatedTask });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ success: false, message: "Internal issue" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Task deleted", deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Internal issue" });
  }
};

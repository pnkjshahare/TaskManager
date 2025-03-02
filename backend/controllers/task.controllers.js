// server/controllers/taskController.js
const Task = require("../models/task.models.js");

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ position: 1, createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single task
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    // Get the number of existing tasks to set the position
    const count = await Task.countDocuments();

    // Set position at the end if not provided
    if (req.body.position === undefined) {
      req.body.position = count;
    }

    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update positions of remaining tasks
    await Task.updateMany(
      { position: { $gt: task.position } },
      { $inc: { position: -1 } }
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reorder tasks
exports.reorderTasks = async (req, res) => {
  try {
    // Process as a transaction to ensure all updates succeed or fail together
    const session = await Task.startSession();
    session.startTransaction();

    try {
      const reorderData = req.body;

      // Update each task with its new position
      const updatePromises = reorderData.map(({ id, position }) => {
        return Task.findByIdAndUpdate(id, { position }, { new: true, session });
      });

      // Execute all updates
      const updatedTasks = await Promise.all(updatePromises);

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res
        .status(200)
        .json({ message: "Tasks reordered successfully", tasks: updatedTasks });
    } catch (error) {
      // Abort transaction on error
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

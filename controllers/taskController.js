import Task from "../models/task.js";
import ErrorHandler from "../utils/errorHandler.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  await Task.create({
    title,
    description,
    user: req.user,
  });

  res.status(201).json({
    success: true,
    message: "Task Added Successfully",
  });
};

export const getMyTasks = async (req, res, next) => {
  const tasks = await Task.find({ user: req.user._id });

  res.status(201).json({
    success: true,
    tasks,
  });
};

export const updateTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) return next(new ErrorHandler("Invalid Id", 404));

  task.isCompleted = !task.isCompleted;

  await task.save();

  res.status(201).json({
    success: true,
    message: "Task Updated!",
  });
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) return next(new ErrorHandler("Invalid Id", 404));

  await task.deleteOne();

  res.status(201).json({
    success: true,
    message: "Task Deleted!",
  });
};

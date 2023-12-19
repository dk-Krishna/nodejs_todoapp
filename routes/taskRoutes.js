import express from "express";

// importing controllers
import {
  deleteTask,
  getMyTasks,
  newTask,
  updateTask,
} from "../controllers/taskController.js";

// importing middlewares
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(isAuthenticated, newTask);

router.route("/my").get(isAuthenticated, getMyTasks);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;

import express from "express";
import {
  deleteTask,
  getAllTasks,
  getTask,
  newTask,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", newTask);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;

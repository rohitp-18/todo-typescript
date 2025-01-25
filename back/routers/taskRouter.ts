import express from "express";
import {
  changeOrder,
  deleteTask,
  getAllTasks,
  getTask,
  newTask,
  updateTask,
} from "../controllers/taskController";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.use(auth);

router.get("/", getAllTasks);
router.post("/new", newTask);
router.route("/changeOrder").put(changeOrder);
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

export default router;

import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import ErrorHandler from "../utils/errorHandler";

const getAllTasks = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      tasks,
    });
  }
);

const newTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, deadline } = req.body;

    if (!title || !deadline) {
      return next(new ErrorHandler("Please fill all required fields", 403));
    }

    const task = await Task.create({ title, description, deadline });

    res.status(200).json({
      success: true,
      task,
    });
  }
);

const getTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findById(req.params.id);

    res.status(200).json({
      success: true,
      task,
    });
  }
);

const updateTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, deadline, progress } = req.body;

    if (!title || !progress || !deadline) {
      return next(new ErrorHandler("Please fill all required fields", 403));
    }

    const task = await Task.findByIdAndUpdate(req.params.id, {
      title,
      description,
      deadline,
      progress,
    });

    res.status(200).json({
      success: true,
      task,
    });
  }
);

const deleteTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      task,
    });
  }
);

export { getAllTasks, newTask, getTask, updateTask, deleteTask };

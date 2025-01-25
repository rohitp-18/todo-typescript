import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel";
import ErrorHandler from "../utils/errorHandler";

const getAllTasks = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find({ user: req.user._id }).sort({ order: 1 });

    res.status(200).json({
      success: true,
      tasks,
    });
  }
);

// creeate new task
// POST /tasks/new
const newTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, deadline } = req.body;

    if (!title || !deadline) {
      return next(new ErrorHandler("Please fill all required fields", 403));
    }

    const index = await Task.find({
      user: req.user._id,
      progress: "todo",
    }).countDocuments();

    const task = await Task.create({
      title,
      description,
      deadline,
      order: index,
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      task,
    });
  }
);

const getTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

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

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title,
        description,
        deadline,
        progress,
      }
    );

    res.status(200).json({
      success: true,
      task,
    });
  }
);

const deleteTask = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      task,
    });
  }
);

// change order of tasks
// PUT /api/v1/task/changeorder
const changeOrder = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tasks, removeTask, progress } = req.body;

    const task = await Task.findOne({ _id: removeTask, user: req.user._id });

    tasks.map(async (task: string, index: number) => {
      if (task === removeTask) {
        await Task.findOneAndUpdate(
          { _id: task, user: req.user._id },
          { order: index, progress }
        );
      } else {
        await Task.findOneAndUpdate(
          { _id: task, user: req.user._id },
          { order: index }
        );
      }
    });

    res.status(200).json({
      success: true,
    });
  }
);

export { getAllTasks, newTask, getTask, updateTask, deleteTask, changeOrder };

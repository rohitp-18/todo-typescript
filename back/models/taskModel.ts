import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    deadline: {
      type: String,
    },
    progress: {
      type: String,
      default: "todo",
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);

export default Task;

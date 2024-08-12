import { Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";

const error = (err: ErrorHandler, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export default error;

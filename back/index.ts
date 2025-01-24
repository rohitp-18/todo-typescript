import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config({ path: path.resolve(path.join(__dirname, "/config/.env")) }); //for development
// dotenv.config(); // for hosting

import mongodb from "./config/mongodb";
import error from "./middlewares/error";

import taskRouter from "./routers/taskRouter";
import userRouter from "./routers/userRouter";

mongodb();

const app = express();

app.use(cors<Request>({ origin: "http://localhost:3000", credentials: true })); // for development
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(express.static(path.resolve(path.join(__dirname, "../front/build")))); // for hosting

app.use("/api/v1/tasks", taskRouter);
app.use("/api/v1/users", userRouter);

// app.get("*", (req: Request, res: Response) => {
//   // res.sendFile(path.resolve(path.join(__dirname, "../front/build/index.html"))); //for hosting
// });

// app.use(error);
app.use(error);
// app.use((err: ErrorHandler, req: Request, res: Response, next: any) => {
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message,
//     stack: err.stack,
//   });
// });

app.listen(process.env.PORT);

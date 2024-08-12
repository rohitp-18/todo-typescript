import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
// import cors from "cors";

// dotenv.config({ path: path.resolve(path.join(__dirname, "/config/.env")) }); //for development
dotenv.config(); // for hosting

import mongodb from "./config/mongodb";
import error from "./middlewares/error";
import router from "./routers/taskRouter";

mongodb();

const app = express();

// app.use(cors<Request>({ origin: "http://localhost:3000", credentials: true })); // for development
app.use(express.json());
app.use(express.static(path.resolve(path.join(__dirname, "../front/build")))); // for hosting

app.use("/tasks", router);
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(path.join(__dirname, "../front/build/index.html"))); //for hosting
});

app.use(error);

app.listen(process.env.PORT);

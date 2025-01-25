import { Router } from "express";
import {
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../controllers/userController";
import { auth } from "../middlewares/auth";
import upload from "../config/multer";

const router = Router();

router.get("/", auth, getUsers);
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", auth, logoutUser);
router.put("/update", auth, upload.single("image"), updateProfile);

export default router;

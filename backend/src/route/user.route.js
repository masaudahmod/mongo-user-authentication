import express from "express";
import {
  changePassword,
  createUser,
  getUsers,
  login,
  logout,
  mailverification,
  refreshAccessToken,
  updateProfile,
} from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/users").get(auth, getUsers).post(createUser);
router.route("/users/verify/:token").get(mailverification);
router.route("/users/login").post(login);
router.route("/users/update").post(auth, upload.single("avatar"), updateProfile);
router.route("/users/logout").post(auth, logout);
router.route("/users/change-password").post(auth, changePassword);
router.route("/users/refresh-access-token").post(auth, refreshAccessToken);

export default router;
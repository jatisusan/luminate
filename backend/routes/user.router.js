import express from "express";
import { getProfile, login, logout, signup } from "../controller/user.controller.js";
import checkAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile",checkAuth, getProfile);

export default router;
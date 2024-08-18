import express from "express";
import { getProfile, login, logout, signup, updateProfile, getUsers, deleteUser } from "../controller/user.controller.js";
import {checkAdmin, checkAuth} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", checkAuth, getProfile);

router.put("/profile", checkAuth, updateProfile);

router.get("/allusers", checkAuth, checkAdmin, getUsers);

router.delete("/:id", checkAuth, checkAdmin, deleteUser);


export default router;
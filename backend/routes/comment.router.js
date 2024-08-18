import express from "express";
import {checkAdmin, checkAuth} from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getAllComments, getComments, updateComment } from "../controller/comment.controller.js";

const router = express.Router();

router.get("/all", checkAuth, checkAdmin, getAllComments);

router.post("/:postId/:parentCommentId?", checkAuth, addComment);

router.get("/:postId", getComments);

router.put("/:commentId", checkAuth, updateComment);

router.delete("/:commentId", checkAuth, deleteComment);

export default router;
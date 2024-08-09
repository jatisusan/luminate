import express from "express";
import checkAuth from "../middleware/auth.middleware.js";
import { addComment, deleteComment, getComments, updateComment } from "../controller/comment.controller.js";

const router = express.Router();

router.post("/:postId/:parentCommentId?", checkAuth, addComment);

router.get("/:postId", getComments);

router.put("/:commentId", checkAuth, updateComment);

router.delete("/:commentId", checkAuth, deleteComment);

export default router;
import express from "express";
import { createPost, deletePost, dislikePost, getPostById, getPosts, getPostsByCategory, likePost, searchPost, updatePost } from "../controller/post.controller.js";
import checkAuth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create", checkAuth, createPost);



router.get("/search", searchPost);



router.get("/:postId", getPostById);

router.put("/:postId", checkAuth, updatePost);

router.delete("/:postId", checkAuth, deletePost);

router.put("/:postId/like", checkAuth, likePost);

router.put("/:postId/dislike", checkAuth, dislikePost);







export default router;


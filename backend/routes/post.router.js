import express from "express";
import {
	createPost,
	deletePost,
	dislikePost,
	getAllPosts,
	getMyPosts,
	getPostById,
	getPosts,
	getTopPosts,
	likePost,
	updatePost,
} from "../controller/post.controller.js";
import {checkAuth} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/myposts", checkAuth, getMyPosts);

router.get("/top-posts", getTopPosts);

router.get("/all", getAllPosts);

router.post("/create", checkAuth, createPost);

router.get("/:postId", getPostById);

router.put("/:postId", checkAuth, updatePost);

router.delete("/:postId", checkAuth, deletePost);

router.put("/:postId/like", checkAuth, likePost);

router.put("/:postId/dislike", checkAuth, dislikePost);

export default router;

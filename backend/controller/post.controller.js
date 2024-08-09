import asyncHandler from "../middleware/asynchandler.js";
import Post from "../models/post.model.js";
import apiError from "../utils/apiError.js";

// create new post
const createPost = asyncHandler(async (req, res) => {
	let { title, content, category } = req.body;
	let newPost = await Post.create({
		title,
		content,
		category,
		author: req.user._id,
	});
	res.send({ message: "New post created", post: newPost });
});

// get all posts
const getPosts = asyncHandler(async (req, res) => {
	let keyword = req.query.keyword;
	let category = req.query.category;
	console.log(keyword);
	keyword = keyword
		? {
				$or: [
					{
						title: {
							$regex: keyword,
							$options: "i",
						},
					},
					{
						content: {
							$regex: keyword,
							$options: "i",
						},
					},
				],
		  }
		: category
		? null
		: {};
	let posts = await Post.find(keyword ? { ...keyword } : { category }).populate(
		[
			{ path: "author", select: "username email" },
			{ path: "likes", select: "username email" },
		]
	);
	if (!posts) throw new apiError(404, "No posts found!");
	res.send(posts);
});

const getPostById = asyncHandler(async (req, res) => {
	let post = await Post.findById(req.params.postId).populate([
		{ path: "author", select: "username email" },
		{ path: "likes", select: "username email" },
	]);
	if (!post) throw new apiError(404, "Post not found!");
	res.send(post);
});

// update my post
const updatePost = asyncHandler(async (req, res) => {
	let { title, content, category } = req.body;
	let { postId } = req.params;
	let post = await Post.findById(postId);
	if (!post) throw new apiError(404, "Post not found!");
	if (String(req.user._id) === String(post.author)) {
		post.title = title || post.title;
		post.content = content || post.content;
		post.category = category || post.category;
		let updatedPost = await post.save();
		res.send({ message: "Post updated", post: updatedPost });
	} else {
		throw new apiError(401, "User not authorized!");
	}
});

// delete my post
const deletePost = asyncHandler(async (req, res) => {
	let { postId } = req.params;
	let post = await Post.findById(postId);
	if (!post) throw new apiError(404, "Post not found!");
	if (String(post.author) === String(req.user._id)) {
		await Post.findByIdAndDelete(postId);
		res.send({ message: "Post deleted" });
	} else {
		throw new apiError(401, "User not authorized!");
	}
});

// like a post
const likePost = asyncHandler(async (req, res) => {
	let { postId } = req.params;
	let post = await Post.findById(postId).populate([
		{ path: "author", select: "username email" },
		{ path: "likes", select: "username email" },
	]);
	if (!post) throw new apiError(404, "Post not found!");
	if (post.likes.includes(req.user._id)) {
		throw new apiError(400, "You already liked this post!");
	} else {
		post.likes.push(req.user._id);
		await post.save();
		res.send({ message: "Liked post", post: post });
	}
});

// dislike a liked post
const dislikePost = asyncHandler(async (req, res) => {
	let { postId } = req.params;
	let post = await Post.findById(postId).populate([
		{ path: "author", select: "username email" },
		{ path: "likes", select: "username email" },
	]);
	if (!post) throw new apiError(404, "Post not found!");
	post.likes = post.likes.filter((l) => String(l._id) !== String(req.user._id));
	await post.save();
	res.send({ message: "Like removed", post: post });
});

// search post
const searchPost = asyncHandler(async (req, res) => {
	let { query } = req.query;

	let searchCriteria = {};
	if (query) {
		searchCriteria.$or = [
			{ title: { $regex: query, $options: "i" } },
			{ content: { $regex: query, $options: "i" } },
		];
	}
	let filteredPosts = await Post.find(searchCriteria);
	res.send(filteredPosts);
});

// get post by category
const getPostsByCategory = asyncHandler(async (req, res) => {
	let { category } = req.params;
	let posts = await Post.find({ category });
	if (!posts) throw new apiError(404, "No posts found");
	res.send(posts);
});

export {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost,
	likePost,
	dislikePost,
	searchPost,
	getPostsByCategory,
};

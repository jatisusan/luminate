import asyncHandler from "../middleware/asynchandler.js";
import Post from "../models/post.model.js";
import apiError from "../utils/apiError.js";

// create new post
const createPost = asyncHandler(async (req, res) => {
	let { title, content, category, image } = req.body;
	let newPost = await Post.create({
		title,
		content,
		image,
		category,
		author: req.user._id,
	});
	res.send({ message: "New post created", post: newPost });
});

// get all posts
const getPosts = asyncHandler(async (req, res) => {
	let pageSize = 6;
	let page = Number(req.query.pageNumber) || 1;
	let keyword = req.query.keyword;
	let category = req.query.category;
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
	let posts = await Post.find(keyword ? { ...keyword } :category? { category } : {}).populate(
		[
			{ path: "author", select: "username email pfp" },
			{ path: "likes", select: "username email" },
		]
	).limit(pageSize).skip(pageSize * (page - 1));
	if (!posts) throw new apiError(404, "No posts found!");
	let count = await Post.countDocuments(keyword ? { ...keyword } :category? { category }: {});
	res.send({posts, page, pages: Math.ceil(count / pageSize)});
});

const getPostById = asyncHandler(async (req, res) => {
	let post = await Post.findById(req.params.postId).populate([
		{ path: "author", select: "username email pfp" },
		{ path: "likes", select: "username email pfp" },
	]);
	if (!post) throw new apiError(404, "Post not found!");
	res.send(post);
});

// update my post
const updatePost = asyncHandler(async (req, res) => {
	let { title, content, category, image } = req.body;
	let { postId } = req.params;
	let post = await Post.findById(postId);
	if (!post) throw new apiError(404, "Post not found!");
	if (String(req.user._id) === String(post.author)) {
		post.title = title || post.title;
		post.content = content || post.content;
		post.category = category || post.category;
		post.image = image || post.image;
		let updatedPost = await post.save();
		res.send({
			message: "Post updated",
			post: updatedPost,
		});
	} else {
		throw new apiError(401, "User not authorized!");
	}
});

// delete post
const deletePost = asyncHandler(async (req, res) => {
	let { postId } = req.params;
	let post = await Post.findById(postId);
	if (!post) throw new apiError(404, "Post not found!");
	if ((String(post.author) === String(req.user._id)) || req.user.isAdmin) {
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

const getMyPosts = asyncHandler(async (req, res) => {
	let user = req.user._id;
	let myPosts = await Post.find({ author: user });
	if (!myPosts) throw new apiError(404, "Posts not found!");
	res.send(myPosts);
});

const getTopPosts = asyncHandler(async (req, res) => {
	let posts = await Post.aggregate([
		{
			$addFields: {
				likesCount: { $size: "$likes" },
			},
		},
		{ $sort: { likesCount: -1 } },
		{ $limit: 3 },
	]);
	res.send(posts);
});

const getAllPosts = asyncHandler(async (req, res) => {
	let posts = await Post.find({}).populate("author");
	res.send(posts);
})

export {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost,
	likePost,
	dislikePost,
	getMyPosts,
	getTopPosts,
	getAllPosts
};

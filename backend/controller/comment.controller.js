import asyncHandler from "../middleware/asynchandler.js";
import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import apiError from "../utils/apiError.js";

const addComment = asyncHandler(async (req, res) => {
	let { content } = req.body;
	let { postId, parentCommentId } = req.params;
	let newComment = await Comment.create({
		content,
		author: req.user._id,
		post: postId,
		parentComment: parentCommentId || null,
	});
	res.send({ message: "Comment added", comment: newComment });
});

// get comments by post id
const getComments = asyncHandler(async (req, res) => {
	let { postId } = req.params;
	let post = await Post.findById(postId);
	if (!post) throw new apiError(404, "Post not found!");
	let comments = await Comment.find({ post: postId }).populate("author");
	const nestedComments = buildNestedComment(comments);
	res.send(nestedComments);
});

// helper function to build nested comments
function buildNestedComment(comments, parentCommentId = null) {
	return  comments
		.filter((c) => String(c.parentComment) === String(parentCommentId))
		.map((tc) => ({
			...tc._doc,  // use ._doc to get plain javascript object representation
			replies: buildNestedComment(comments, tc._id),
        }));
}


// update my comment
const updateComment = asyncHandler(async (req, res) => {
	let { content } = req.body;
	let { commentId } = req.params;
	let comment = await Comment.findById(commentId);
	if (!comment) throw new apiError(404, 'Comment not found!');
	if (String(comment.author) === String(req.user._id)) {
		comment.content = content || comment.content;
		let updatedComment = await comment.save();
		res.send({ message: 'Comment updated', comment: updatedComment });
	} else {
		throw new apiError(401, 'User not authorized!');
	}
});

// delete my comment
const deleteComment = asyncHandler(async (req, res) => {
	let { commentId } = req.params;
	let comment = await Comment.findById(commentId);
	if (!comment) throw new apiError(404, 'Comment not found!');
	await Comment.findByIdAndDelete(commentId);
	res.send({ message: "Comment deleted" });
});


export { addComment, getComments , updateComment, deleteComment};

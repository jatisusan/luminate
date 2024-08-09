import mongoose from "mongoose";
import moment from "moment";

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	category: {
		type: String,
		default: "",
	},
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	createdAt: {
		type: String,
		default: () => moment().format("YYYY-MM-DD HH-mm-ss"),
	},
});

const Post = mongoose.model("Post", postSchema);

export default Post;

import asyncHandler from "../middleware/asynchandler.js";
import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/token.utils.js";
import Post from "../models/post.model.js";

const signup = asyncHandler(async (req, res) => {
	let { username, email, password } = req.body;
	let userExists = await User.findOne({ email });
	if (userExists)
		throw new apiError(400, `User with email ${email} already exists!`);
	let newUser = await User.create({ username, email, password });
	res.send({
		message: "User registered successfully",
		user: {
			username: newUser.username,
			email: newUser.email,
		},
	});
});

const login = asyncHandler(async (req, res) => {
	let { email, password } = req.body;
	let user = await User.findOne({ email });
	if (!user) throw new apiError(400, `${email} is not registered!`);
	let match = await bcrypt.compare(password, user.password);
	if (match) {
		createToken(res, user._id);
		res.send({
			message: "Login Success",
			user: {
				username: user.username,
				email: user.email,
			},
		});
	} else {
		throw new apiError(400, "Invalid password!");
	}
});

const logout = asyncHandler(async (req, res) => {
	res.clearCookie("jwt");
	res.send({ message: "Logout Success" });
});

// get user profile
const getProfile = asyncHandler(async (req, res) => {
	let user = await User.findById(req.user._id);
	let posts = await Post.find({ author: req.user._id });
	res.send({ user: user, posts: posts });
});

export { signup, login, logout, getProfile };

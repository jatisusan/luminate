import User from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import asyncHandler from "./asynchandler.js";
import jwt from "jsonwebtoken";

const checkAuth = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    if (!token) throw new apiError(401, "You must be logged in!");
    try {
        let { userId } = jwt.verify(token, process.env.JWT_SECRET);
        let userdetail = await User.findById(userId).select("-password");
        req.user = userdetail;
        next();
    } catch (err) {
        throw new apiError(400, 'Invalid token!');
    }
});

const checkAdmin = asyncHandler(async (req, res, next) => {
    const { isAdmin } = req.user;
    if (isAdmin) {
        next();
    } else {
        throw new apiError(400, "Only admin can access!");
    }
})

export{ checkAuth, checkAdmin} ;
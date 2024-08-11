import express from "express";
import errorHandler from "./middleware/errhandler.js";
import cookieParser from "cookie-parser";

// ROUTER IMPORTS
import userRouter from "./routes/user.router.js";
import postRouter from "./routes/post.router.js";
import commentRouter from "./routes/comment.router.js";
import uploadRouter from './routes/upload.router.js';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/image", uploadRouter);


// ERROR HANDLERS
app.use(errorHandler);

export default app;

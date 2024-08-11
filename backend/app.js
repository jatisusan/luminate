import express from "express";
import errorHandler from "./middleware/errhandler.js";
import cookieParser from "cookie-parser";
import path from "path";

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


//
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    })
} else {
    app.get("/", (req, res) => {
        res.send("Server is running");
    })
}


// ERROR HANDLERS
app.use(errorHandler);

export default app;

import express from "express";
import multer from "multer";
import apiError from "../utils/apiError.js";
import asyncHandler from "../middleware/asynchandler.js";


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        let fn = `${Date.now()}-${file.originalname}`;
        cb(null, fn)
    }
});

const fileFilter = (req, file, cb) => {
    let fileRegex = /\.(png|jpg|jpeg|webp)$/;
    if (!file.originalname.match(fileRegex)) {
        cb(new apiError(400, 'Only image files supported!'), false);
    } else {
        cb(null, true)
    }
}

const upload = multer({
    storage,
    fileFilter
});

router.post("/upload", upload.single("image"), asyncHandler(async (req, res) => {
    res.send({
        message: 'Image uploaded',
        filePath: `/${req.file.path}`
    })
}));


export default router;
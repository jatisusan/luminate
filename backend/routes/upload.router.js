import express from "express";
import multer from "multer";
import apiError from "../utils/apiError.js";
import asyncHandler from "../middleware/asynchandler.js";
import { v2 as cloudinary } from "cloudinary";
import {CloudinaryStorage } from "multer-storage-cloudinary";

const router = express.Router();

// CONFIGURE CLOUDINARY
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// SETUP CLOUDINARY STORAGE WITH MULTER
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "blogplatform",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})


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
        filePath: req.file.path  // Cloudinary URL for the uploaded image
    })
}));


export default router;
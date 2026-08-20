import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
});

router.post(
    "/upload-test",
    upload.single("file"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file was uploaded.",
            });
        }

        return res.json({
            success: true,
            message: "File received successfully.",
            file: {
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                size: req.file.size,
            },
        });
    },
);

export default router;
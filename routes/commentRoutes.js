import express from "express";
import { getCommentsByPost } from "../controllers/commentController.js";

const router = express.Router();

router.get("/:postId", getCommentsByPost);

export default router;
import express from "express";
import {
  getPosts,
  createPost,
  likePost,
  deletePost,
  addComment
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", createPost);

router.post("/:id/like", likePost);

router.delete("/:id", deletePost);

router.post("/:id/comments", addComment);

export default router;
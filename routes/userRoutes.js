import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  getFollows,
  toggleFollow
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/follows", getFollows);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/follow", toggleFollow);

export default router;
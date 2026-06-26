import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  getFollows,
  toggleFollow,
  updateUser
} from "../controllers/UserController.js";
const router = express.Router();

router.get("/", getUsers);
router.get("/follows", getFollows);
router.get("/:id", getUserById);
router.post("/", createUser);
router.post("/follow", toggleFollow);
router.get("/test", (req, res) => {
  res.send("PUT route file loaded");
});
router.get("/test", (req, res) => {
  res.send("USER ROUTES WORKING");
});
router.put("/hello", (req, res) => {
  res.send("PUT works");
});
router.put("/:id", updateUser);
export default router;
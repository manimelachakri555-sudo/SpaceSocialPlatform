import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const post = await Post.create({
      user: userId,
      content,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { userId } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ message: "Post not found" });

    const liked = post.likes.includes(userId);

    if (liked)
      post.likes.pull(userId);
    else
      post.likes.push(userId);

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { userId, content } = req.body;

   const comment = await Comment.create({
  post: req.params.id,
  user: userId,
  content,
});

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
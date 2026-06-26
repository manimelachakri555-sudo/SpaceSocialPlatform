import User from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createUser = async (req, res) => {
  try {

    console.log("========== CREATE USER ==========");
    console.log("BODY =", req.body);

    const {
      authUserId,
      username,
      handle,
      avatar,
      bio,
    } = req.body;

    console.log("authUserId =", authUserId);

    // Check if handle already exists
    const existingUser = await User.findOne({ handle });

    if (existingUser) {
      return res.status(400).json({
        error: "Handle already exists"
      });
    }

    const user = await User.create({
      authUserId,
      username,
      handle,
      avatar: avatar || "",
      bio: bio || ""
    });

    console.log("USER CREATED =", user);

    res.status(201).json(user);

  } catch (error) {

    console.log("CREATE USER ERROR =", error);

    res.status(500).json({
      message: error.message
    });

  }
};
export const updateUser = async (req, res) => {
  try {

    const { username, handle, bio, avatar } = req.body;

    // Check if another user already uses this handle
    const existingUser = await User.findOne({
      handle,
      _id: { $ne: req.params.id }
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Handle already exists"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username,
        handle,
        bio,
        avatar
      },
      {
        new: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(updatedUser);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

export const getFollows = async (req, res) => {
  try {
    const users = await User.find();

    const follows = [];

    users.forEach((user) => {
      user.following.forEach((followingId) => {
        follows.push({
          followerId: user._id,
          followingId
        });
      });
    });

    res.json(follows);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const toggleFollow = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;

    const follower = await User.findById(followerId);
    const following = await User.findById(followingId);

    if (!follower || !following) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const alreadyFollowing = follower.following.includes(followingId);

    if (alreadyFollowing) {
      follower.following.pull(followingId);
      following.followers.pull(followerId);
    } else {
      follower.following.push(followingId);
      following.followers.push(followerId);
    }

    await follower.save();
    await following.save();

    res.json({
      message: "Follow updated"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
    authUserId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Auth",
required:false
},
    username: {
        type: String,
        required: true
    },

    handle: {
        type: String,
        required: true,
        unique: true
    },

    avatar: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },
    followersCount: {
  type: Number,
  default: 0
},

followingCount: {
  type: Number,
  default: 0
},

    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
},
{
    timestamps: true
});

export default mongoose.model("User", userSchema);
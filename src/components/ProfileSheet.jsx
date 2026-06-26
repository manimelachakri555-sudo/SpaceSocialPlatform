import React, { useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { X, Calendar, FileText } from "lucide-react";
import { PostCard } from "./PostCard";
import { motion } from "motion/react";
import EditProfileModal from "./EditProfileModal";
export function ProfileSheet({
  userId,
  users,
  currentUser,
  posts,
  follows,
  onFollowToggle,
  onLike,
  onDeletePost,
  onClose,
  onViewProfile,
}) {
  const user = users.find((u) => u._id === userId);
  const [showEdit, setShowEdit] = useState(false);

  if (!user) return null;

  // Compute followers, followings
  const userFollowers = follows.filter((f) => f.followingId === user._id);
  const userFollowing = follows.filter((f) => f.followerId === user._id);
  const isFollowingMe = follows.some((f) => f.followerId === user._id && f.followingId ===currentUser._id);
  const isFollowedByMe = follows.some((f) => f.followerId === currentUser._id && f.followingId === user._id);
console.log(posts);
console.log(user._id);
  const userPosts = posts.filter((p) => p.user === user._id);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
      {/* Backdrop clickable handler */}
      <div className="absolute inset-0" onClick={onClose} />
{showEdit && (
  <EditProfileModal
    user={user}
    onClose={() => setShowEdit(false)}
    onUpdated={(updatedUser) => {

      // Update current profile immediately
      Object.assign(user, updatedUser);

      setShowEdit(false);

    }}
  />
)}
      {/* Slideout Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-lg h-full bg-slate-50 border-l border-slate-100 flex flex-col shadow-2xl z-20"
      >
        {/* Banner Area */}
        <div className="h-10 bg-slate-900 relative flex-shrink-0 overflow-hidden">
          {/* Ambient background decoration */}
          <div className="absolute inset-0 opacity-15 bg-radial-gradient from-indigo-500 via-transparent to-transparent pointer-events-none" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-950/40 hover:bg-slate-950/60 text-white rounded-full transition-all active:scale-90 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Info Details Overlay */}
        <div className="px-5 md:px-6 -mt-10 relative pb-4 border-b border-slate-100 bg-white flex-shrink-0">
          <div className="flex justify-between items-end gap-3 mb-3">
            <Avatar username={user.username} avatarClass={user.avatar} size="xl" />

           {user._id !== currentUser._id ? (

  <button
    onClick={() => onFollowToggle(user._id)}
    className={`px-4.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all active:scale-95 ${
      isFollowedByMe
        ? "border border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
        : "bg-slate-900 text-white hover:bg-slate-800"
    }`}
  >
    {isFollowedByMe ? "Unfollow" : "Follow"}
  </button>

) : (

  <button
    onClick={() => setShowEdit(true)}
    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all"
  >
    Edit Profile
  </button>

)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800 font-sans tracking-tight">
                {user.username}
              </h2>
              {isFollowingMe && (
                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-medium">
                  Follows you
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-indigo-600 mt-0.5">@{user.handle}</p>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed break-words">
              {user.bio || "No biography shared yet."}
            </p>

            {/* Date Joined */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-3.5">
              <Calendar size={13} />
              <span>Joined {user.joinedDate || "Recent"}</span>
            </div>

            {/* Stats list */}
            <div className="flex gap-4 mt-4 font-sans text-xs text-slate-500">
              <div className="flex items-center gap-1">
               <span className="font-bold text-slate-800 text-[13px]">
  {user.followersCount
    ? `${(user.followersCount / 1000000).toFixed(1)}M`
    : user.followers?.length || userFollowers.length}
</span>
                <span>followers</span>
              </div>
              <div className="flex items-center gap-1">
               <span className="font-bold text-slate-800 text-[13px]">
  {user.followingCount || userFollowing.length}
</span>
                <span>following</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-slate-800 text-[13px]">{userPosts.length}</span>
                <span>posts</span>
              </div>
            </div>
          </div>
        </div>

        {/* User's Posts Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <FileText size={12} className="text-slate-400" />
            <span>Posts By {user.username ? user.username.split(" ")[0] : ""}</span>
          </div>

          {userPosts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-250/30">
              <p className="text-sm italic">No updates shared yet by this creator.</p>
            </div>
          ) : (
            userPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                users={users}
                currentUser={currentUser}
                onLike={onLike}
                onDelete={onDeletePost}
                onViewProfile={onViewProfile}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

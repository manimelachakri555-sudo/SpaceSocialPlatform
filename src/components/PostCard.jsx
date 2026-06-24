import React, { useState, useEffect } from "react";
import { Heart, MessageSquare, Trash2, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar } from "./Avatar";
import { formatRelativeTime } from "../utils";
import { subscribeToComments, addPostComment } from "../lib/db";

export function PostCard({
  post,
  users,
  currentUser,
  onLike,
  onDelete,
  onViewProfile,
}) {
 const author = users.find((u) => u._id === post.user) || {
  _id: post.user,
  username: "Deleted User",
  handle: "deleted",
  avatar: "bg-slate-400",
  bio: "",
  joinedDate: "",
};

  const isLikedByMe = post.likes.includes(currentUser._id);
  const isMyPost = post.user === currentUser._id;

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    if (!isCommentsOpen) return;

    setIsLoadingComments(true);
    const unsubscribe = subscribeToComments(post._id, (loadedComments) => {
      setComments(loadedComments);
      setIsLoadingComments(false);
    });

    return () => unsubscribe();
  }, [isCommentsOpen, post._id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await addPostComment(post._id, currentUser._id, newComment);
      setNewComment("");
    } catch (err) {
      console.error("Error creating comment", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onViewProfile(author._id)}
            className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
          >
            <Avatar username={author.username} avatarClass={author.avatar} size="md" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => onViewProfile(author._id)}
                className="font-sans font-bold text-slate-800 text-[15px] hover:underline hover:text-slate-900 cursor-pointer text-left"
              >
                {author.username}
              </button>
              <span className="text-xs font-mono text-slate-400">@{author.handle}</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {formatRelativeTime(post.createdAt)}
            </p>
          </div>
        </div>

        {isMyPost && (
          <button
            onClick={() => onDelete(post._id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 active:scale-90"
            title="Delete individual post"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap mb-4 break-words">
        {post.content}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-6 pt-3 border-t border-slate-50 text-slate-500 text-sm font-medium">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center gap-1.5 hover:text-rose-600 transition-colors duration-200 group active:scale-95 cursor-pointer`}
        >
          <div
            className={`p-2 rounded-full group-hover:bg-rose-50 transition-colors duration-200 ${
              isLikedByMe ? "text-rose-600 bg-rose-50" : ""
            }`}
          >
            <Heart
              size={18}
              className={`transition-all duration-300 ${
                isLikedByMe ? "fill-rose-500 stroke-rose-500 scale-110" : "scale-100"
              }`}
            />
          </div>
          <span>{post.likes ? post.likes.length : 0}</span>
        </button>

        <button
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors duration-200 group active:scale-95 cursor-pointer"
        >
          <div
            className={`p-2 rounded-full group-hover:bg-indigo-50 transition-colors duration-200 ${
              isCommentsOpen ? "text-indigo-600 bg-indigo-50" : ""
            }`}
          >
            <MessageSquare size={18} />
          </div>
          <span>{isCommentsOpen ? "Hide" : "Comments"}</span>
        </button>
      </div>

      {/* Comments Panel */}
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
              {/* Comment submission form */}
              <form onSubmit={handleAddComment} className="flex gap-2 items-center">
                <Avatar username={currentUser.username} avatarClass={currentUser.avatar} size="sm" />
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a sweet reply..."
                    disabled={isSubmitting}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-slate-300 text-slate-800 text-sm py-2 pl-3 pr-10 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-slate-100 transition-all duration-200 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isSubmitting}
                    className="absolute right-1 top-1 p-1 text-slate-400 hover:text-indigo-600 disabled:opacity-30 disabled:hover:text-slate-400 transition-all cursor-pointer rounded-lg hover:bg-slate-100"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>

              {/* Feed of comments */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {isLoadingComments ? (
                  <div className="flex justify-center py-4 text-xs font-mono text-slate-400">
                    Loading comments stream...
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic text-center py-2">
                    No comments yet. Be the first to strike a conversation!
                  </p>
                ) : (
                  comments.map((comment) => {
                    const commentAuthor = users.find((u) => u._id === comment.user) || {
                      username: "Deleted User",
                      avatar: "bg-slate-400",
                    };
                    return (
                      <div key={comment._id} className="flex gap-2 items-start bg-slate-50/50 p-2.5 rounded-xl border border-slate-50">
                        <Avatar username={commentAuthor.username} avatarClass={commentAuthor.avatar} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-xs font-semibold text-slate-700">
                              {commentAuthor.username}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {formatRelativeTime(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mt-0.5 break-words">
  {comment.content}
</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

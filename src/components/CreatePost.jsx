import React, { useState } from "react";
import { Avatar } from "./Avatar";
import { Globe } from "lucide-react";

export function CreatePost({ currentUser, onSubmit }) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await onSubmit(content);
    if (success) {
      setContent("");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 md:p-5 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="flex gap-3">
          <Avatar username={currentUser.username} avatarClass={currentUser.avatar} size="md" />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${currentUser.username ? currentUser.username.split(" ")[0] : ""}?`}
            rows={3}
            className="flex-1 w-full text-slate-800 text-sm placeholder-slate-400 border-0 focus:ring-0 outline-none resize-none bg-transparent py-1 leading-relaxed"
            maxLength={500}
          />
        </div>

        {/* Action Panel */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-150/40">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 font-medium text-slate-500">
              <Globe size={13} className="text-indigo-500" />
              <span>Public Space</span>
            </div>
            <span className="text-[10px] text-slate-300 font-mono">
              {content.length}/500
            </span>
          </div>

          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="px-4.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {isSubmitting ? "Sharing..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

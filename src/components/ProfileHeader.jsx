import React, { useState } from "react";
import { X, Palette } from "lucide-react";
import { motion } from "motion/react";
import { createNewUserProfile, fetchAllUsers } from "../lib/db";

const GRADIENTS = [
  { name: "Sleet", class: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500" },
  { name: "Breeze", class: "bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600" },
  { name: "Sunset", class: "bg-gradient-to-tr from-yellow-250 via-orange-400 to-rose-600" },
  { name: "Cosmo", class: "bg-gradient-to-tr from-violet-600 to-indigo-600" },
  { name: "Sage", class: "bg-gradient-to-tr from-emerald-500 to-cyan-500" },
];

export function ProfileRegistration({ userId, onClose, onSuccess }) {
  const [username, setUsername] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [selectedGradient, setSelectedGradient] = useState(GRADIENTS[0].class);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !handle.trim()) {
      setErrorMsg("Username and Handle are mandatory");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const cleanHandle = handle.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();

    try {
      // Check handles across existing users
      const allUsers = await fetchAllUsers();
      const duplicate = allUsers.find(
  (u) => u.handle?.toLowerCase() === cleanHandle.toLowerCase()
);
      if (duplicate) {
        setErrorMsg(`Handle @${cleanHandle} is already registered by another explorer.`);
        setIsSubmitting(false);
        return;
      }

      // Create target ID
      
      const created = await createNewUserProfile({
        username: username.trim(),
        handle: cleanHandle,
        avatar: selectedGradient,
        bio: bio.trim(),
      });

      onSuccess(created._id);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Could not complete profile save to cloud persistence.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl flex flex-col"
      >
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Create New Profile</h3>
            <p className="text-xs text-slate-400 font-medium">Build a local test account instantly</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 px-3.5 py-2.5 rounded-xl mb-4 font-medium leading-relaxed">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Profile Display Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alan Turing"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 focus:border-slate-350 text-slate-800 text-sm py-2 px-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-slate-50 transition-all placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Handle (Unique ID)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">@</span>
              <input
                type="text"
                required
                placeholder="alan_turing"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:border-slate-350 text-slate-800 text-sm py-2 pl-7 pr-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-slate-50 transition-all font-mono placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Profile Bio
            </label>
            <textarea
              placeholder="Tell others about your interest, codes, or views..."
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 focus:border-slate-350 text-slate-800 text-sm py-2 px-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-slate-50 transition-all placeholder-slate-400 resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Palette size={13} className="text-violet-500" />
              <span>Avatar Theme Accent</span>
            </label>
            <div className="flex gap-2.5">
              {GRADIENTS.map((g) => {
                const isSelected = selectedGradient === g.class;
                return (
                  <button
                    key={g.name}
                    type="button"
                    onClick={() => setSelectedGradient(g.class)}
                    className={`w-8 h-8 rounded-full ${g.class} relative flex items-center justify-center transition-all cursor-pointer ${
                      isSelected ? "ring-2 ring-slate-900 ring-offset-2 scale-110 shadow-md" : "hover:scale-105"
                    }`}
                    title={g.name}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-600 transition-all active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all disabled:opacity-40 active:scale-95 cursor-pointer"
            >
              {isSubmitting ? "Registering..." : "Create Profile"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

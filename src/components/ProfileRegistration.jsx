import React, { useState } from "react";
import { X, Palette } from "lucide-react";
import { motion } from "motion/react";
import { createNewUserProfile, fetchAllUsers } from "../lib/db";

const GRADIENTS = [
  { name: "Sleet", class: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500" },
  { name: "Breeze", class: "bg-gradient-to-tr from-green-300 via-blue-500 to-purple-600" },
  { name: "Sunset", class: "bg-gradient-to-tr from-yellow-300 via-orange-400 to-rose-600" },
  { name: "Cosmo", class: "bg-gradient-to-tr from-violet-600 to-indigo-600" },
  { name: "Sage", class: "bg-gradient-to-tr from-emerald-500 to-cyan-500" },
];

export function ProfileRegistration({ onClose, onSuccess }) {
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
      const allUsers = await fetchAllUsers();

      const duplicate = allUsers.find(
        (u) => u.handle === cleanHandle
      );

      if (duplicate) {
        setErrorMsg(`Handle @${cleanHandle} already exists.`);
        setIsSubmitting(false);
        return;
      }

      const created = await createNewUserProfile(null, {
        username: username.trim(),
        handle: cleanHandle,
        avatar: selectedGradient,
        bio: bio.trim(),
      });

      onSuccess(created._id);
    } catch (err) {
      setErrorMsg(err.message || "Server communication failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
       className="relative w-full max-w-xl bg-white border border-slate-100 rounded-2xl p-6 shadow-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3
  className="text-[18px] font-bold text-slate-800"
  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
>
              Launch Space Profile
            </h3>

           <p className="text-xs text-slate-400 font-medium mt-1">
              Build a local test account instantly
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-3 text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Your Name
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full bg-slate-50 border border-slate-100 focus:border-slate-300 text-slate-800 text-sm py-2 px-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-slate-50 transition-all"
              placeholder="ChakriManimela"
            />
          </div>

          <div>
            <label className="space-font text-xs font-bold uppercase tracking-widest text-slate-500">
              Select Handle Name
            </label>

            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
              placeholder="@chakri_315"
            />
          </div>

          <div>
            <label className="space-font text-xs font-bold uppercase tracking-widest text-slate-500">
              Biography
            </label>

            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-indigo-400"
              placeholder="Design student, compilation visualizer..."
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Palette size={14} className="text-violet-500" />
              <span className="space-font text-xs font-bold uppercase tracking-widest text-slate-500">
                Avatar Profile Texture
              </span>
            </div>

            <div className="flex gap-3">
              {GRADIENTS.map((g) => (
                <button
                  key={g.name}
                  type="button"
                  onClick={() => setSelectedGradient(g.class)}
                  className={`w-8 h-8 rounded-full ${g.class}
                  ${
                    selectedGradient === g.class
                      ? "ring-2 ring-slate-900 ring-offset-2 scale-110 shadow-md"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-all active:scale-95"
          >
            {isSubmitting
              ? "Authorizing..."
              : "Authorize Core Identity"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
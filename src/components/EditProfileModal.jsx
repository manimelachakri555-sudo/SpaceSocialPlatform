import { useState } from "react";
import { X } from "lucide-react";

import { updateUserProfile } from "../lib/db";

export default function EditProfileModal({
  user,
  onClose,
  onUpdated,
}) {

  const [username, setUsername] = useState(user.username);

  const [handle, setHandle] = useState(user.handle);

  const [bio, setBio] = useState(user.bio);

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {

    setLoading(true);
console.log("Editing user ID:", user._id);
    try {

      const updatedUser = await updateUserProfile(
        user._id,
        {
          username,
          handle,
          bio,
          avatar: user.avatar
        }
      );

      onUpdated(updatedUser);

      onClose();

    } catch (err) {

      alert(err.message);

    }

    setLoading(false);

  };

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-6 w-[420px]">

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-bold">
            Edit Profile
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="mt-6 space-y-4">

          <input
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
            className="w-full border rounded-xl p-3"
          />

          <input
            value={handle}
            onChange={(e)=>setHandle(e.target.value)}
            placeholder="Handle"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            placeholder="Bio"
            rows={4}
            className="w-full border rounded-xl p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-blue-600 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>

  );

}
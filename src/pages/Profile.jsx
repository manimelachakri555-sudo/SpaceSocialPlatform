import { useState } from "react";
import EditProfileModal from "../components/EditProfileModal";

export default function Profile({ currentUser, setCurrentUser }) {

  const [showEdit, setShowEdit] = useState(false);

  if (!currentUser) {
    return (
      <div className="p-10">
        User not found
      </div>
    );
  }

  return (

    <div className="max-w-3xl mx-auto p-8">

      {/* Avatar */}

      <div
        className={`w-28 h-28 rounded-full ${currentUser.avatar}`}
      ></div>

      {/* Username */}

      <h1 className="text-3xl font-bold mt-5">
        {currentUser.username}
      </h1>

      {/* Handle */}

      <p className="text-gray-500">
        @{currentUser.handle}
      </p>

      {/* Bio */}

      <p className="mt-4">
        {currentUser.bio}
      </p>

      {/* Followers */}

      <div className="flex gap-8 mt-6">

        <div>

          <h3 className="font-bold">
            {currentUser.followers.length}
          </h3>

          <p>Followers</p>

        </div>

        <div>

          <h3 className="font-bold">
            {currentUser.following.length}
          </h3>

          <p>Following</p>

        </div>

      </div>

      {/* Edit Button */}

      <button
        onClick={() => setShowEdit(true)}
        className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white"
      >
        Edit Profile
      </button>

      {/* Popup */}

      {showEdit && (

        <EditProfileModal

          user={currentUser}

          onClose={() => setShowEdit(false)}

          onUpdated={(user) => {
            setCurrentUser(user);
          }}

        />

      )}

    </div>

  );

}
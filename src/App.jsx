import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  PlusCircle,
  Globe,
  Radio,
  RefreshCw,
  Search,
  MessageSquare,
  LogIn,
  LogOut
} from "lucide-react";
import { Avatar } from "./components/Avatar";
import { CreatePost } from "./components/CreatePost";
import { PostCard } from "./components/PostCard";
import { ProfileSheet } from "./components/ProfileSheet";
import { ProfileRegistration } from "./components/ProfileRegistration";

import {
  fetchUserById,
  togglePostLike,
  deletePost,
  toggleFollow,
  createPost,
  subscribeToUsers,
  subscribeToPosts,
  subscribeToFollows
} from "./lib/db";

export default function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [follows, setFollows] = useState([]);
  useEffect(() => {
  console.log("USERS:", users);
  console.log("POSTS:", posts);
  console.log("FOLLOWS:", follows);
}, [users, posts, follows]);
  
  // High-fidelity profile modes
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("global");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isRegisteringOpen, setIsRegisteringOpen] = useState(false);
  const [registeringGoogleUID, setRegisteringGoogleUID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
const [userSearch, setUserSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 1. Initial Seeding Check & Real-time Collection Subscriptions
  useEffect(() => {
    setIsLoading(true);
    const unsubUsers = subscribeToUsers((usersList) => {
      setUsers(usersList);
      setIsLoading(false);
    });

    const unsubPosts = subscribeToPosts(setPosts);
    const unsubFollows = subscribeToFollows(setFollows);

    return () => {
      unsubUsers();
      unsubPosts();
      unsubFollows();
    };
  }, []);

  // 2. Load active identity session state (local/simulated switcher only, no Firebase auth)
useEffect(() => {
  if (isLoading || users.length === 0) return;

  const savedActiveId = localStorage.getItem("social_active_user");

  const matched = users.find(
    (u) => String(u._id) === String(savedActiveId)
  );

  if (matched) {
    setCurrentUser(matched);
  } else {
    setCurrentUser(null);
    setIsRegisteringOpen(true);
  }

  setIsAuthLoading(false);

}, [users, isLoading]);
  // Handle Google Sign In (mocked elegantly to suggest profile creation)
  const handleGoogleLogin = () => {
    setIsRegisteringOpen(true);
  };

  // Handle Google Sign Out
 const handleGoogleLogout = () => {
  localStorage.removeItem("social_active_user");
  setCurrentUser(null);
  setIsRegisteringOpen(true);
};

  // Set simulated acting user state and persist
  
  // Like Toggle Handler
  const handleLike = async (postId) => {
    if (!currentUser) return;
    const post = posts.find((p) => p._id === postId);
    if (!post) return;

    const hasLiked = post.likes.some(
  (id) => String(id) === String(currentUser._id)
);
    try {
      await togglePostLike(postId, currentUser._id, hasLiked);
    } catch (err) {
      console.error("Error toggling like status on backend:", err);
    }
  };

  // Follow/Unfollow Toggle Handler
  const handleFollowToggle = async (targetId) => {
    if (!currentUser || currentUser._id === targetId) return;

    const isFollowedByMe = follows.some(
      (f) => f.followerId === currentUser._id && f.followingId === targetId
    );

    try {
      await toggleFollow(currentUser._id, targetId, isFollowedByMe);
    } catch (err) {
      console.error("Error negotiating follow toggle on backend:", err);
    }
  };

  // Post Submission Handler
  const handlePostSubmit = async (content) => {
    if (!currentUser) return false;
    try {
      await createPost(currentUser._id, content);
      return true;
    } catch (err) {
      console.error("Error creating post in backend:", err);
      return false;
    }
  };

  // Post deletion Handler
  const handlePostDelete = async (postId) => {
    if (!currentUser) return;
    try {
      await deletePost(postId, currentUser._id);
    } catch (err) {
      console.error("Could not trigger post deletion on backend:", err);
    }
  };

  // Registration profile completion
  const handleRegisterSuccess = async (newUserId) => {
  setIsRegisteringOpen(false);

  const user = await fetchUserById(newUserId);

  if (user) {
    setCurrentUser(user);
    localStorage.setItem("social_active_user", user._id);
    setIsAuthLoading(false);
  }
};

  // Manual silent poll
  const triggerManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };


  const followingIds = currentUser
  ? follows
      .filter((f) => f.followerId === currentUser._id)
      .map((f) => f.followingId)
  : [];
  const searchedPosts = posts.filter((post) => {
    const textMatch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
   const author = users.find((u) => String(u._id) === String(post.user));
    const authorMatch = author
      ? author.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.handle.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    return textMatch || authorMatch;
  });

 const filteredPosts = searchedPosts
  .filter((post) => {
    if (activeTab === "following") {
      return followingIds.includes(post.user);
    }
    return true;
  })
  .sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );
 if (isLoading || isAuthLoading) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400">
          Synchronizing space persistence...
        </p>
      </div>
    </div>
  );
}


  // Current session statistics
  const myFollowers = follows.filter((f) => f.followingId === currentUser._id);
  const myFollowing = follows.filter((f) => f.followerId === currentUser._id);
  const myPostsCount = posts.filter((p) => p.user=== currentUser._id).length;
console.log("CURRENT USER:", currentUser?.username);
console.log("SELECTED USER:", selectedUserId);
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased font-sans">
      {/* Top Professional Navbar */}
      <header className="sticky top-0 z-45 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 md:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center text-white shadow-md font-bold text-sm tracking-widest text-[#50e3c2]">
            SP
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-base tracking-tight text-slate-900 leading-none">
              Space
            </h1>
            <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-600 uppercase">
              Cloud Social Platform
            </span>
          </div>
        </div>

        {/* Action Controls & Authentication Status */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Refresh Button */}
          <button
            onClick={triggerManualRefresh}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            title="Force refresh synchronization"
          >
            <RefreshCw size={15} className={`${isRefreshing ? "animate-spin text-indigo-600" : ""}`} />
          </button>

          {/* Quick acting simulated profile switcher dropdown */}
         

          <button
            onClick={() => {
              setRegisteringGoogleUID(null);
              setIsRegisteringOpen(true);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-indigo-100"
          >
            <PlusCircle size={14} />
            <span className="hidden sm:inline">New Profile</span>
          </button>
        </div>
      </header>

      {/* Main Content Layout Grid */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Main updates feed */}
        <div className="lg:col-span-8 space-y-5">
          {/* Top Post Composer */}
          <CreatePost currentUser={currentUser} onSubmit={handlePostSubmit} />

          {/* Search bar & Tabs */}
          <div className="bg-white border border-slate-100 rounded-2xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            {/* Nav Tabs */}
            <div className="flex gap-1 bg-slate-50 rounded-xl p-1 flex-shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab("global")}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "global"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Globe size={13} />
                <span>Global Space</span>
              </button>
              <button
                onClick={() => setActiveTab("following")}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === "following"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Radio size={13} />
                <span>Following</span>
              </button>
            </div>

            {/* Micro search filter */}
           <div className="relative flex-1 max-w-sm">
  <Search
    size={14}
    className="absolute left-3.5 top-3 text-slate-400"
  />

  <input
    type="text"
    placeholder="Search people..."
    value={userSearch}
onChange={(e)=>setUserSearch(e.target.value)}
    className="w-full bg-slate-50 border border-slate-150 rounded-xl py-2 pl-9 pr-4 text-xs"
  />

  {userSearch && (
    <div className="absolute top-full left-0 right-0 bg-white border border-slate-100 rounded-xl mt-2 shadow-lg z-50">
      {users
        .filter(
          (u) =>
          u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
u.handle.toLowerCase().includes(userSearch.toLowerCase())
        )
        .map((user) => (
          <button
            key={user._id}
            onClick={() => {
              setSelectedUserId(user._id);
             setUserSearch("");
            }}
            className="w-full flex items-center gap-3 p-3 hover:bg-slate-50"
          >
            <Avatar
              username={user.username}
              avatarClass={user.avatar}
              size="sm"
            />

            <div className="text-left">
              <div className="font-semibold text-slate-700">
                {user.username}
              </div>

              <div className="text-xs text-slate-400">
                @{user.handle}
              </div>
            </div>
          </button>
        ))}
    </div>
  )}
</div>
            

          </div>

          {/* Posts Feed container */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 shadow-xs"
                >
                  <MessageSquare size={32} className="mx-auto text-slate-200 mb-3" />
                  <p className="text-sm font-semibold text-slate-600">No updates found here</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                    {activeTab === "following"
                      ? "You are not following any creator with matches yet. Explore and follow creators from the discover tab on the right."
                      : "The space is quiet. Be the first to share an update or change search query!"}
                  </p>
                </motion.div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    users={users}
                    currentUser={currentUser}
                    onLike={handleLike}
                    onDelete={handlePostDelete}
                    onViewProfile={(userId) => setSelectedUserId(userId)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: User Session info + Discover lists */}
        <div className="lg:col-span-4 space-y-6">
          {/* Compact Active Profile summary Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedUserId(currentUser._id)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <Avatar username={currentUser.username} avatarClass={currentUser.avatar} size="lg" />
              </button>
              <div className="min-w-0">
                <button
                  onClick={() => setSelectedUserId(currentUser._id)}
                  className="font-sans font-bold text-slate-800 text-[15px] hover:underline cursor-pointer text-left block truncate w-full"
                >
                  {currentUser.username}
                </button>
                <span className="text-[11px] font-mono text-indigo-600 block">@{currentUser.handle}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3.5 leading-relaxed break-words line-clamp-2">
              {currentUser.bio || "No biography shared yet. Click to view profile."}
            </p>

            {/* Profile Statistics counts */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-100/70 pt-4 mt-4 text-center">
              <div>
                <p className="text-base font-bold text-slate-800 leading-none">{myPostsCount}</p>
                <span className="text-[10px] text-slate-400 font-medium">Posts</span>
              </div>
              <div className="border-x border-slate-100 font-medium">
                <p className="text-base font-bold text-slate-800 leading-none">{myFollowers.length}</p>
                <span className="text-[10px] text-slate-400 font-medium">Followers</span>
              </div>
              <div>
                <p className="text-base font-bold text-slate-800 leading-none">{myFollowing.length}</p>
                <span className="text-[10px] text-slate-400 font-medium">Following</span>
              </div>
            </div>
          </div>

          {/* Creators Discovery list panel */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-1.5 pb-2.5 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Users size={14} className="text-indigo-500" />
              <span>Discover Creators</span>
            </div>

            <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
              {/* Show users other than the active current session */}
              {users
                .filter((u) => u._id!== currentUser._id)
                .map((member) => {
                  const isFollowedByMe = follows.some(
                    (f) => f.followerId === currentUser._id && f.followingId === member._id
                  );

                  return (
                    <div key={member._id} className="flex items-center justify-between gap-2 text-sm">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          onClick={() => setSelectedUserId(member._id)}
                          className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
                        >
                          <Avatar username={member.username} avatarClass={member.avatar} size="sm" />
                        </button>
                        <div className="min-w-0">
                          <button
                            onClick={() => setSelectedUserId(member._id)}
                            className="font-bold text-slate-700 hover:underline hover:text-slate-800 truncate text-[13px] block text-left"
                          >
                            {member.username}
                          </button>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            @{member.handle}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleFollowToggle(member._id)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all active:scale-95 flex-shrink-0 ${
                          isFollowedByMe
                            ? "border border-slate-150 text-slate-500 bg-slate-50 hover:bg-slate-100"
                            : "bg-slate-900 text-white hover:bg-slate-800"
                        }`}
                      >
                        {isFollowedByMe ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </main>
<footer className="mt-12 border-t border-slate-100 bg-white">
  <div className="max-w-6xl mx-auto px-6 py-10">

    {/* Top Section */}
    <div className="flex flex-col md:flex-row justify-between gap-10">

      {/* Logo & About */}
      <div className="max-w-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-[#50e3c2] font-bold text-sm tracking-widest shadow-md">
            SP
          </div>

          <div>
            <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
              Space
            </h2>

            <p className="text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-600">
              Cloud Social Platform
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-500">
          Space is a modern social platform where creators and communities
          connect, share updates and interact in real time.
        </p>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
          Contact Us
        </h3>

        <div className="space-y-2 text-sm text-slate-500">
          <p>📧 space555@gmail.com</p>
          <p>🌐 Global Community</p>
          <p>💬 Connect with creators worldwide</p>
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
          Features
        </h3>

        <div className="space-y-2 text-sm text-slate-500">
          <p>• Real-Time Posts</p>
          <p>• Likes & Comments</p>
          <p>• Follow Creators</p>
          <p>• Search Profiles</p>
          <p>• Personalized Feed</p>
        </div>
      </div>

      {/* Policies */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
          Information
        </h3>

        <div className="space-y-2 text-sm text-slate-500">
          <p>Privacy Policy</p>
          <p>Community Guidelines</p>
          <p>Terms of Service</p>
          <p>Help Center</p>
        </div>
      </div>

    </div>

    {/* Bottom */}
    <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-3">
      <p className="text-xs text-slate-400">
        © 2026 Space • Cloud Social Platform
      </p>

      <p className="text-xs font-mono tracking-wider text-indigo-500 uppercase">
        Connect • Share • Inspire
      </p>
    </div>

  </div>
</footer>
      {/* Floating Panel: Individual User Profiles slide-out side sheet */}
      <AnimatePresence>
        {selectedUserId && (
          <ProfileSheet
            userId={selectedUserId}
            users={users}
            currentUser={currentUser}
            posts={posts}
            follows={follows}
            onFollowToggle={handleFollowToggle}
            onLike={handleLike}
            onDeletePost={handlePostDelete}
            onClose={() => setSelectedUserId(null)}
            onViewProfile={(id) => setSelectedUserId(id)}
          />
        )}
      </AnimatePresence>

      {/* Floating Panel: Profile registration modal */}
      <AnimatePresence>
        {isRegisteringOpen && (
          <ProfileRegistration
            userId={registeringGoogleUID || undefined}
            onClose={() => {
              setIsRegisteringOpen(false);
              setRegisteringGoogleUID(null);
            }}
            onSuccess={handleRegisterSuccess}
          />
        )}
      </AnimatePresence>
    </div>
    
  );
}

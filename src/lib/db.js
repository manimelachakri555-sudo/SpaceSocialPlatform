// src/lib/db.js
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://spacesocialplatform.onrender.com";
// Seed function
export async function seedInitialDataIfEmpty() {
  return;
}

// ================= USERS =================

export async function fetchUserById(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users/${userId}`);

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("fetchUserById error:", error);
    return null;
  }
}

export async function createNewUserProfile(userId, profile) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: profile.username,
        handle: profile.handle,
        avatar: profile.avatar,
        bio: profile.bio
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Could not create profile");
    }

    return await res.json();

  } catch (error) {
    console.error("createNewUserProfile error:", error);
    throw error;
  }
}

export async function fetchAllUsers() {
  try {
   const res = await fetch(`${API_BASE_URL}/api/users`);
    if (!res.ok) return [];

    return await res.json();

  } catch (error) {
    console.error("fetchAllUsers error:", error);
    return [];
  }
}

export function subscribeToUsers(onNext) {

  let active = true;

  const poll = async () => {

    try {

      const res = await fetch(`${API_BASE_URL}/api/users`);

      if (!res.ok) return;

      const users = await res.json();

      if (active) {
        onNext(users);
      }

    } catch (error) {
      console.error("subscribeToUsers error:", error);
    }

  };

  poll();

  const interval = setInterval(poll, 3000);

  return () => {

    active = false;

    clearInterval(interval);

  };
}

// ================= POSTS =================

export function subscribeToPosts(onNext) {

  let active = true;

  const poll = async () => {

    try {

     const res = await fetch(`${API_BASE_URL}/api/posts`);

      if (!res.ok) return;

      const posts = await res.json();

      if (active) {
        onNext(posts);
      }

    } catch (error) {
      console.error("subscribeToPosts error:", error);
    }

  };

  poll();

  const interval = setInterval(poll, 3000);

  return () => {

    active = false;

    clearInterval(interval);

  };
}

export async function createPost(userId, content) {

  try {

    const res = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        content
      })
    });

    if (!res.ok) {
      throw new Error("Could not create post");
    }

    return await res.json();

  } catch (error) {
    console.error("createPost error:", error);
    throw error;
  }
}

export async function togglePostLike(postId, userId) {

  try {

    await fetch(`${API_BASE_URL}/api/posts/${postId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId
      })
    });

  } catch (error) {
    console.error("togglePostLike error:", error);
  }
}

export async function deletePost(postId) {

  try {

    await fetch(`${API_BASE_URL}/api/posts/${postId}`,{
      method: "DELETE"
    });

  } catch (error) {
    console.error("deletePost error:", error);
  }
}

// ================= COMMENTS =================

export function subscribeToComments(postId, onNext) {

  let active = true;

  const poll = async () => {

    try {

      const res = await fetch(`${API_BASE_URL}/api/comments/${postId}`)

      if (!res.ok) return;

      const comments = await res.json();

      if (active) {
        onNext(comments);
      }

    } catch (error) {
      console.error("subscribeToComments error:", error);
    }

  };

  poll();

  const interval = setInterval(poll, 3000);

  return () => {

    active = false;

    clearInterval(interval);

  };
}

export async function addPostComment(postId, userId, content) {

  try {

    const res = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        content
      })
    });

    if (!res.ok) {
      throw new Error("Could not add comment");
    }

    return await res.json();

  } catch (error) {
    console.error("addPostComment error:", error);
    throw error;
  }
}

// ================= FOLLOWS =================

export function subscribeToFollows(onNext) {

  let active = true;

  const poll = async () => {

    try {

      const res = await fetch(`${API_BASE_URL}/api/users/follows`);

      if (!res.ok) return;

      const follows = await res.json();

      if (active) {
        onNext(follows);
      }

    } catch (error) {
      console.error("subscribeToFollows error:", error);
    }

  };

  poll();

  const interval = setInterval(poll, 3000);

  return () => {

    active = false;

    clearInterval(interval);

  };
}

export async function toggleFollow(followerId, followingId) {

  try {

    await fetch(`${API_BASE_URL}/api/users/follow`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        followerId,
        followingId
      })
    });

  } catch (error) {
    console.error("toggleFollow error:", error);
  }
}
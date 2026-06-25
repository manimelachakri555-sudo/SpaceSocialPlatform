const API =
  import.meta.env.VITE_API_URL ||
  "https://spacesocialplatform.onrender.com";

// SIGN UP
export async function signup(email, password) {
  const res = await fetch(`${API}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await res.json();
}

// LOGIN
export async function login(email, password) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await res.json();
}
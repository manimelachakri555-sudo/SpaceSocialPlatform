import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import SocialButtons from "../components/SocialButtons";

import { login } from "../lib/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      if (data.token) {

    localStorage.setItem("token", data.token);

    localStorage.setItem("authUserId", data.userId);

    if (data.profileExists) {

        navigate("/home");

    } else {

        navigate("/create-profile");

    }

}
      else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Unable to login.");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue your journey."
      bottomText="Don't have an account?"
      bottomLink="Sign Up"
      bottomRoute="/signup"
    >
      <form onSubmit={handleLogin} className="space-y-5">
        <AuthInput
          label="Email Address"
          icon={<Mail size={20} />}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <AuthInput
          label="Password"
          icon={<Lock size={20} />}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-slate-400 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="accent-blue-600"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Forgot Password?
          </Link>
        </div>

               <button
          type="submit"
          disabled={loading}
          className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-cyan-500
          py-4
          text-white
          font-semibold
          text-lg
          shadow-lg
          shadow-blue-600/30
          hover:scale-[1.02]
          hover:shadow-blue-500/40
          transition-all
          duration-300
          disabled:opacity-60
          "
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}

        <div className="flex items-center my-8">

          <div className="flex-1 h-px bg-slate-700"></div>

          <span className="px-4 text-slate-500 text-sm">
            OR
          </span>

          <div className="flex-1 h-px bg-slate-700"></div>

        </div>

        <SocialButtons />

      </form>

    </AuthLayout>

  );

}
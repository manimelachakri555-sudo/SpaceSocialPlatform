import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { User, Mail, Lock } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import SocialButtons from "../components/SocialButtons";

import { signup } from "../lib/auth";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const data = await signup(email, password);

      if (data.token) {

        localStorage.setItem("token", data.token);

        navigate("/create-profile");

      } else {

        alert(data.message || "Signup failed");

      }

    } catch (err) {

      alert("Server Error");

    }

    setLoading(false);

  };
    return (
    <AuthLayout
      title="Create Account"
      subtitle="Join millions of creators on Space."
      bottomText="Already have an account?"
      bottomLink="Login"
      bottomRoute="/login"
    >

      <form onSubmit={handleSignup}>

        <AuthInput
          label="Full Name"
          icon={<User size={20} />}
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthInput
          label="Confirm Password"
          icon={<Lock size={20} />}
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          mt-2
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          via-indigo-600
          to-cyan-500
          py-4
          text-lg
          font-semibold
          text-white
          shadow-lg
          shadow-blue-600/30
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-blue-500/40
          disabled:opacity-60
          "
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        {/* Divider */}

        <div className="my-8 flex items-center">

          <div className="h-px flex-1 bg-slate-700"></div>

          <span className="px-4 text-sm text-slate-500">
            OR
          </span>

          <div className="h-px flex-1 bg-slate-700"></div>

        </div>

        <SocialButtons />

      </form>

    </AuthLayout>
  );

}
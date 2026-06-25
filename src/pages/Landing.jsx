import { Link } from "react-router-dom";
import { Users, MessageCircle, Heart } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-[#50e3c2] font-bold">
            SP
          </div>

          <div>
            <h1 className="font-bold text-2xl">Space</h1>
            <p className="text-xs text-indigo-600 uppercase tracking-widest">
              Cloud Social Platform
            </p>
          </div>

        </div>

        <Link
          to="/login"
          className="bg-slate-900 text-white px-5 py-2 rounded-xl font-semibold hover:bg-slate-800"
        >
          Connect
        </Link>

      </nav>

      {/* Hero */}

      <section className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

        <div>

          <h1 className="text-6xl font-black leading-tight text-slate-900">
            Connect.
            <br />
            Share.
            <br />
            Inspire.
          </h1>

          <p className="mt-8 text-slate-500 text-lg leading-8">

            Join millions of creators and communities.
            Share your moments, interact with people,
            and build your own profile on Space.

          </p>

          <div className="mt-10 flex gap-4">

            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-slate-300 px-8 py-4 rounded-2xl font-bold hover:bg-white"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right Card */}

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <div className="space-y-8">

            <div className="flex items-center gap-4">

              <Users className="text-indigo-600" size={36} />

              <div>

                <h2 className="font-bold">
                  Follow Creators
                </h2>

                <p className="text-slate-500 text-sm">
                  Stay connected with your favourite people.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <Heart className="text-rose-500" size={36} />

              <div>

                <h2 className="font-bold">
                  Like Posts
                </h2>

                <p className="text-slate-500 text-sm">
                  Engage with millions of posts.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <MessageCircle className="text-green-500" size={36} />

              <div>

                <h2 className="font-bold">
                  Comment & Chat
                </h2>

                <p className="text-slate-500 text-sm">
                  Join conversations instantly.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}
import { Link } from "react-router-dom";

export default function AuthLayout({
  title,
  subtitle,
  children,
  bottomText,
  bottomLink,
  bottomRoute,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712]">

      {/* Top Glow */}
      <div className="absolute -top-48 right-0 h-[550px] w-[550px] rounded-full bg-blue-700/20 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="absolute -bottom-56 left-1/2 -translate-x-1/2 h-[700px] w-[900px] rounded-full border border-indigo-500/30" />

      {/* Left Glow */}
      <div className="absolute left-0 top-0 h-full w-72 bg-gradient-to-r from-blue-700/5 to-transparent" />

      {/* Navbar */}

      <nav className="relative z-20 flex items-center gap-4 p-10">

        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/60 bg-slate-900 shadow-lg shadow-indigo-700/30">

          <span className="text-3xl font-bold text-cyan-400">
            SP
          </span>

        </div>

        <div>

          <h1
            className="text-4xl font-bold text-white"
            style={{
              fontFamily: "Space Grotesk",
            }}
          >
            Space
          </h1>

          <p className="tracking-[5px] text-blue-500 text-sm uppercase">
            Cloud Social Platform
          </p>

        </div>

      </nav>

      {/* Center */}

      <div className="relative z-20 flex items-center justify-center px-6">

        <div className="w-full max-w-xl">

          <h2
            className="text-center text-6xl font-bold text-white"
            style={{
              fontFamily: "Space Grotesk",
            }}
          >
            {title}
          </h2>

          <p className="mt-5 text-center text-xl text-slate-400">
            {subtitle}
          </p>

          {/* Card */}

          <div
            className="
            mt-12
            rounded-[32px]
            border
            border-slate-700
            bg-[#0b1120]/90
            p-10
            backdrop-blur-xl
            shadow-2xl
            "
          >
            {children}

            <p className="mt-10 text-center text-slate-400">

              {bottomText}

              <Link
                to={bottomRoute}
                className="ml-2 font-semibold text-blue-500 hover:text-blue-400"
              >
                {bottomLink}
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
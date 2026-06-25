import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export default function SocialButtons() {
  return (
    <div className="space-y-4">

      <button
        className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-slate-700
        bg-[#111827]
        py-3
        text-white
        transition
        duration-300
        hover:border-blue-500
        hover:bg-slate-900
        "
      >
        <FcGoogle size={24} />
        Continue with Google
      </button>

      <button
        className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-slate-700
        bg-[#111827]
        py-3
        text-white
        transition
        duration-300
        hover:border-blue-500
        hover:bg-slate-900
        "
      >
        <FaGithub size={22} />
        Continue with GitHub
      </button>

      <button
        className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-slate-700
        bg-[#111827]
        py-3
        text-white
        transition
        duration-300
        hover:border-blue-500
        hover:bg-slate-900
        "
      >
        <FaXTwitter size={20} />
        Continue with X
      </button>

    </div>
  );
}
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthInput({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="mb-6">

      <label className="block text-sm font-semibold text-slate-300 mb-2">
        {label}
      </label>

      <div
        className="
        flex
        items-center
        rounded-2xl
        border
        border-slate-700
        bg-[#111827]
        px-4
        py-3
        transition
        duration-300
        focus-within:border-blue-500
        focus-within:ring-2
        focus-within:ring-blue-500/20
        "
      >

        <div className="mr-3 text-slate-500">
          {icon}
        </div>

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
          w-full
          bg-transparent
          outline-none
          text-white
          placeholder:text-slate-500
          "
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="text-slate-500 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}

      </div>

    </div>
  );
}
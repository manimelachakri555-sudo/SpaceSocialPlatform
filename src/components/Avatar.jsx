import React from "react";

export function Avatar({ username, avatarClass, size = "md" }) {
  const firstLetter =
    username && username.trim()
      ? username.trim().charAt(0).toUpperCase()
      : "?";

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm font-medium",
    lg: "w-14 h-14 text-lg font-bold",
    xl: "w-20 h-20 text-2xl font-black",
  };

  const bgClass =
    avatarClass && avatarClass !== ""
      ? avatarClass
      : "bg-gradient-to-tr from-indigo-500 to-cyan-500";

  return (
    <div
      className={`${sizeClasses[size]} ${bgClass}
      rounded-full flex items-center justify-center
      text-white shadow-inner select-none`}
    >
      {firstLetter}
    </div>
  );
}
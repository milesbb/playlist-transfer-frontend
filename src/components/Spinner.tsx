import React from "react";

interface SpinnerProps {
  size?: number; // size in px
  color?: string; // Tailwind color class
}

export default function Spinner({
  size = 20,
  color = "text-white",
}: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ height: size, width: size }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
      />
    </svg>
  );
}

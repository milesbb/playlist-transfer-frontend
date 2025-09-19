import React from "react";

interface SpinnerProps {
  size?: number; // size in px
  color?: string; // Tailwind color class
  fullscreen?: boolean; // show as full-page overlay
}

export default function Spinner({
  size = 20,
  color = "text-white",
  fullscreen = false,
}: SpinnerProps) {
  const spinnerSvg = (
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

  if (!fullscreen) return spinnerSvg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {spinnerSvg}
    </div>
  );
}

import * as React from "react"

function Button({ className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none px-4 py-2"

  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    outline: "border border-gray-300 hover:bg-gray-100",
    secondary: "bg-gray-200 hover:bg-gray-300",
  }

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${className}`}
      {...props}
    />
  )
}

export { Button }
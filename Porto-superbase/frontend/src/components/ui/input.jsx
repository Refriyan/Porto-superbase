import * as React from "react"

function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition " +
        className
      }
      {...props}
    />
  )
}

export { Input }
import * as React from "react"

function Input({ className = "", ...props }) {
  return (
    <input
      className={
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:border-black " +
        className
      }
      {...props}
    />
  )
}

export { Input }
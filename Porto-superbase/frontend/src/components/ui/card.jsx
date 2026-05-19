import * as React from "react"

function Card({ className = "", ...props }) {
  return (
    <div
      className={
        "rounded-lg border border-gray-200 bg-white shadow-sm " + className
      }
      {...props}
    />
  )
}

function CardHeader({ className = "", ...props }) {
  return (
    <div className={"p-4 border-b border-gray-100 " + className} {...props} />
  )
}

function CardContent({ className = "", ...props }) {
  return <div className={"p-4 " + className} {...props} />
}

function CardTitle({ className = "", ...props }) {
  return (
    <h3 className={"font-semibold text-lg " + className} {...props} />
  )
}

export { Card, CardHeader, CardContent, CardTitle }
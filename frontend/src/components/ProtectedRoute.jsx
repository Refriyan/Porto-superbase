import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUser } from "../services/auth"

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  if (!user) return <Navigate to="/login" />

  return children
}
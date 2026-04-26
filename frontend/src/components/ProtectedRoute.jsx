import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/api"

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ✅ Baca session dari local storage dulu (instant, tidak hit network)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // ✅ Listen kalau session berubah (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" />
  return children
}
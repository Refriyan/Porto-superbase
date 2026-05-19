import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../services/api";

export default function ProtectedRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  const SESSION_LIMIT = 10 * 60 * 1000; // 10 menit

  useEffect(() => {
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const loginTime = localStorage.getItem("loginTime");

      // ❌ tidak login
      if (!session || !loginTime) {
        setAllowed(false);
        return;
      }

      // ❌ expired
      const expired = Date.now() - Number(loginTime) > SESSION_LIMIT;

      if (expired) {
        await supabase.auth.signOut();
        localStorage.removeItem("loginTime");
        setAllowed(false);
        return;
      }

      // ✅ aman
      setAllowed(true);
    };

    check();
  }, []);

  if (allowed === null) return <div>Loading...</div>;
  if (!allowed) return <Navigate to="/login" replace />;

  return children;
}
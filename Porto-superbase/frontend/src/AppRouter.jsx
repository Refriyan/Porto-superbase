import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PreLoader from "./components/PreLoader.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import App from "./App.jsx";
// Lazy load halaman berat
const Admin    = lazy(() => import("./pages/Admin"));
const Login    = lazy(() => import("./pages/login.jsx"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PublicLayout = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
);

const AppRouter = () => {
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {!isSpecialPage && <PreLoader />}

      <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center bg-zinc-950">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      }>
      <Routes>
        <Route path="/" element={<PublicLayout><App /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
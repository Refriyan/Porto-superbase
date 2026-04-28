import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PreLoader from "./components/PreLoader.jsx";

import Admin from "./pages/Admin";
import Login from "./pages/login.jsx";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import App from "./App.jsx";

import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const PublicLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-6">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

const AppRouter = () => {
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");

  return (
    <>
      {!isSpecialPage && <PreLoader />}

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <App />
            </PublicLayout>
          }
        />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
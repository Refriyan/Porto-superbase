import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// 🔥 Layout wrapper
const Layout = ({ children }) => {
  return (
    <div className="container mx-auto px-6">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PreLoader />

      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <App />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <Layout>
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            </Layout>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
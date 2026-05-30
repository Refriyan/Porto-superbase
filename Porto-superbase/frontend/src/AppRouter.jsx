import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import PreLoader from "./components/PreLoader.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import App from "./App.jsx";
import Admin from "./pages/Admin";
import Login from "./pages/login.jsx";
import NotFound from "./pages/NotFound";

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

      <Routes>
        <Route path="/" element={<PublicLayout><App /></PublicLayout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;

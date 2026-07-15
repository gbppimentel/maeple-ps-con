import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import { AuthProvider } from "@/lib/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import InvitePage from "./pages/InvitePage";
import Celebration from "./pages/Celebration";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function DeviceGate({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const checkDevice = () => {
      const ua = navigator.userAgent;

      const isMobileOrTablet =
        /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(ua) ||
        (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024);

      setIsAllowed(isMobileOrTablet);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isAllowed === null) return null;

  if (!isAllowed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
          fontFamily: "system-ui",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
             oops bawal sa pc wahahahdsghagha
          </h1>

          <p style={{ opacity: 0.8, fontSize: "1.05rem" }}>
            open mo nalang yung link sa phone or sa ipad ha
            <br />
            xori haha for mobile ko lang sya dinesign ih :P
          </p>
        </div>
      </div>
    );
  }

  return children;
}

function App() {
  return (
    <DeviceGate>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<InvitePage />} />
              <Route path="/celebration" element={<Celebration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>

          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </DeviceGate>
  );
}

export default App;
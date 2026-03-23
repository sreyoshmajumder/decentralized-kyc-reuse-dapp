import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";
import IssuerLoginPage from "./pages/IssuerLoginPage";
import { UserLoginPage, UserRegisterPage } from "./pages/UserAuthPages";

import ServicePortal from "./components/service/ServiceDashboard";
import UserDashboard from "./components/user/UserDashboard";
import IssuerDashboard from "./components/issuer/IssuerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("kyc-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem("kyc-theme", next);
      return next;
    });
  };

  return (
    <div className={`app-root ${theme}`}>
      <div className="app-shell">
        <div className="app-inner">
          <Router>
            <Navbar theme={theme} onToggleTheme={toggleTheme} />

            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/login/user" element={<UserLoginPage />} />
              <Route path="/register" element={<UserRegisterPage />} />
              <Route path="/login/issuer" element={<IssuerLoginPage />} />

              <Route
                path="/user"
                element={
                  <ProtectedRoute role="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/issuer"
                element={
                  <ProtectedRoute role="issuer">
                    <IssuerDashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/service" element={<ServicePortal />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;

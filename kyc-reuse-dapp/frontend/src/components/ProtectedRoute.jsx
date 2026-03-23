import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { currentUser } = useAuth();

  // Not logged in at all → send to issuer login for issuer routes,
  // user login for user routes could be added later.
  if (!currentUser) {
    if (role === "issuer") return <Navigate to="/login/issuer" replace />;
    return <Navigate to="/login/user" replace />;
  }

  // Logged in but wrong role
  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

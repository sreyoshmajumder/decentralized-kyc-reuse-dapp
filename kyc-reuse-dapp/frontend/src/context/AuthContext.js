import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const demoUsers = {
  "issuer@demo.com": {
    email: "issuer@demo.com",
    password: "issuer",
    role: "issuer",
    name: "Demo Issuer"
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const register = ({ name, email, password }) => {
    if (demoUsers[email]) throw new Error("User already exists");
    demoUsers[email] = { email, password, role: "user", name };
    setCurrentUser({ email, role: "user", name });
  };

  const loginUser = ({ email, password }) => {
    const u = demoUsers[email];
    if (!u || u.password !== password || u.role !== "user") {
      throw new Error("Invalid user credentials");
    }
    setCurrentUser({ email: u.email, role: "user", name: u.name });
  };

  const loginIssuer = ({ email, password }) => {
    const u = demoUsers[email];
    if (!u || u.password !== password || u.role !== "issuer") {
      throw new Error("Invalid issuer credentials");
    }
    setCurrentUser({ email: u.email, role: "issuer", name: u.name });
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider
      value={{ currentUser, register, loginUser, loginIssuer, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

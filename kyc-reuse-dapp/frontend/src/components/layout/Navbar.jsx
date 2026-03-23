import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ theme, onToggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isOnHome = location.pathname === "/";

  return (
    <header className="navbar-shell">
      <div
        className="nav-left"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <div className="nav-logo">KYC</div>
        <div>
          <div className="nav-title-main">Decentralized KYC Network</div>
          <div className="nav-title-sub">
            One‑time identity verification, reusable across Web3.
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/user"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            User
          </NavLink>
          <NavLink
            to="/issuer"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Issuer
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Service
          </NavLink>
        </nav>

        <div className="theme-toggle">
          <span>{theme === "dark" ? "Dark" : "Light"} mode</span>
          <button type="button" onClick={onToggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}

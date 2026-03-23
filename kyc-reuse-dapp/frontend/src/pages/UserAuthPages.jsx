import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function UserRegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      register(form);
      nav("/user");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="grid">
        <div className="card">
          <h2>Create user account</h2>
          <p className="muted">
            Register once, then request KYC and reuse it across integrated
            services.
          </p>
          {error && <p className="status-error">{error}</p>}

          <form onSubmit={onSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
              />
            </label>
            <button type="submit">Register</button>
          </form>

          <p className="muted" style={{ marginTop: 10 }}>
            Already have an account? <Link to="/login/user">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function UserLoginPage() {
  const { loginUser } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      loginUser(form);
      nav("/user");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="grid">
        <div className="card">
          <h2>User login</h2>
          <p className="muted">
            Login as a registered user to manage your KYC credentials.
          </p>
          {error && <p className="status-error">{error}</p>}

          <form onSubmit={onSubmit}>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={onChange}
              />
            </label>
            <button type="submit">Login</button>
          </form>

          <p className="muted" style={{ marginTop: 10 }}>
            New here? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

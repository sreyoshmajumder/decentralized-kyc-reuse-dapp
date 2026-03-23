import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function IssuerLoginPage() {
  const { loginIssuer } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "issuer@demo.com",
    password: "issuer"
  });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      loginIssuer(form);     // sets currentUser.role = 'issuer'
      nav("/issuer");        // go to issuer dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="grid">
        <div className="card">
          <h2>Issuer login</h2>
          <p className="muted">
            Login as a regulated issuer to issue and approve KYC credentials.
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
            <button type="submit">Login as issuer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default IssuerLoginPage;

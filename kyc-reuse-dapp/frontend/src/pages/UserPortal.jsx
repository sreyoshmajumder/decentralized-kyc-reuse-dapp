import React, { useState } from "react";
import { useKyc } from "../context/KycContext";

function UserDashboard() {
  const { requests, requestKyc } = useKyc();
  const [form, setForm] = useState({
    fullName: "",
    walletAddress: "",
    country: "",
    note: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.walletAddress) return;
    requestKyc(form);
    setForm({ fullName: "", walletAddress: "", country: "", note: "" });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>User portal</h1>
        <span className="page-pill">Request & reuse KYC</span>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Request new KYC</h2>
          <p className="muted">
            Submit a one‑time verification request that issuers on the network
            can review and approve.
          </p>

          <form onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Satoshi Nakamoto"
              />
            </label>

            <label>
              Wallet address
              <input
                type="text"
                name="walletAddress"
                value={form.walletAddress}
                onChange={handleChange}
                placeholder="0x..."
              />
            </label>

            <label>
              Country
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country of residence"
              />
            </label>

            <label>
              Note for issuer (optional)
              <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Any extra context for review"
              />
            </label>

            <button type="submit">Request KYC</button>
          </form>
        </div>

        <div className="card">
          <h2>Your KYC requests</h2>
          {requests.length === 0 ? (
            <p className="muted">You have not submitted any KYC requests yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Wallet</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>#{r.id}</td>
                    <td>
                      <span
                        className={`badge ${
                          r.status === "approved"
                            ? "badge-ok"
                            : r.status === "rejected"
                            ? "badge-bad"
                            : ""
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="truncate">{r.walletAddress}</td>
                    <td>{new Date(r.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;

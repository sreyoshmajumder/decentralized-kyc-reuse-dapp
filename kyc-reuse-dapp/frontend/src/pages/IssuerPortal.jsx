import React from "react";
import { useKyc } from "../context/KycContext";

function IssuerDashboard() {
  const { requests, approveRequest, rejectRequest } = useKyc();

  const pending = requests.filter((r) => r.status === "pending");
  const processed = requests.filter((r) => r.status !== "pending");

  return (
    <div className="page">
      <div className="page-header">
        <h1>Issuer console</h1>
        <span className="page-pill">Review user KYC</span>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Pending KYC requests</h2>
          {pending.length === 0 ? (
            <p className="muted">No pending requests right now.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Wallet</th>
                  <th>Country</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((r) => (
                  <tr key={r.id}>
                    <td>#{r.id}</td>
                    <td>{r.fullName}</td>
                    <td className="truncate">{r.walletAddress}</td>
                    <td>{r.country || "-"}</td>
                    <td>{r.note || "-"}</td>
                    <td>
                      <div className="row">
                        <button
                          type="button"
                          onClick={() => approveRequest(r.id)}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => rejectRequest(r.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h2>History</h2>
          {processed.length === 0 ? (
            <p className="muted">
              Once you approve or reject, decisions will appear here.
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Wallet</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {processed.map((r) => (
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
                    <td>{r.fullName}</td>
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

export default IssuerDashboard;

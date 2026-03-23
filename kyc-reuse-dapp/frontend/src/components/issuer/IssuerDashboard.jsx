import React, { useState } from "react";
import { KycContext } from "../../context/KycContext";
import { useKyc } from "../../context/KycContext"; 
function fakeIssuerWalletConnect() {
  return Promise.resolve("0xISSUER_WALLET_DEMO");
}

function IssuerDashboard() {
  const {
    requests,
    issuedKyc,
    issueOrUpdateKyc,
    approveRequest,
    rejectRequest
  } = useKyc();

  const [issuerWallet, setIssuerWallet] = useState("");
  const [tab, setTab] = useState("manual");

  const [manualForm, setManualForm] = useState({
    walletAddress: "",
    fullName: "",
    level: "1",
    expiry: "",
    issuerName: "Demo Issuer"
  });

  const connectIssuerWallet = async () => {
    const addr = await fakeIssuerWalletConnect();
    setIssuerWallet(addr);
  };

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualForm((f) => ({ ...f, [name]: value }));
  };

  const submitManual = (e) => {
    e.preventDefault();
    if (!manualForm.walletAddress || !manualForm.expiry) return;

    issueOrUpdateKyc({
      walletAddress: manualForm.walletAddress,
      fullName: manualForm.fullName || "User",
      level: manualForm.level,
      expiry: manualForm.expiry,
      issuer: manualForm.issuerName || "Issuer"
    });

    setManualForm((f) => ({
      ...f,
      walletAddress: "",
      fullName: "",
      level: "1",
      expiry: ""
    }));
  };

  const pending = requests.filter((r) => r.status === "pending");
  const processed = requests.filter((r) => r.status !== "pending");

  return (
    <div className="page">
      <div className="page-header">
        <h1>Issuer console</h1>
        <span className="page-pill">Issue & review KYC</span>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="row">
          <button
            type="button"
            className={tab === "manual" ? "" : "secondary"}
            onClick={() => setTab("manual")}
          >
            Manual issue / update
          </button>
          <button
            type="button"
            className={tab === "requests" ? "" : "secondary"}
            onClick={() => setTab("requests")}
          >
            Review user requests
          </button>
          <span className="muted" style={{ marginLeft: "auto" }}>
            Issuer wallet: {issuerWallet || "not connected"}
          </span>
        </div>
      </div>

      {tab === "manual" ? (
        <div className="grid">
          <div className="card">
            <h2>Issue or update KYC</h2>
            <p className="muted">
              Connect your issuer wallet, then issue or update a credential for
              any address.
            </p>

            <button
              type="button"
              onClick={connectIssuerWallet}
              style={{ marginBottom: 10 }}
            >
              {issuerWallet ? "Reconnect issuer wallet" : "Connect issuer wallet"}
            </button>

            <form onSubmit={submitManual}>
              <label>
                User wallet address
                <input
                  type="text"
                  name="walletAddress"
                  value={manualForm.walletAddress}
                  onChange={handleManualChange}
                />
              </label>
              <label>
                User full name
                <input
                  type="text"
                  name="fullName"
                  value={manualForm.fullName}
                  onChange={handleManualChange}
                />
              </label>
              <label>
                KYC level
                <input
                  type="number"
                  min="1"
                  max="5"
                  name="level"
                  value={manualForm.level}
                  onChange={handleManualChange}
                />
              </label>
              <label>
                Expiry (ISO datetime)
                <input
                  type="text"
                  name="expiry"
                  value={manualForm.expiry}
                  onChange={handleManualChange}
                  placeholder="2027-01-01T00:00:00Z"
                />
              </label>
              <label>
                Issuer name
                <input
                  type="text"
                  name="issuerName"
                  value={manualForm.issuerName}
                  onChange={handleManualChange}
                />
              </label>

              <button type="submit">Issue / update credential</button>
            </form>
          </div>

          <div className="card">
            <h2>Issued credentials</h2>
            {Object.keys(issuedKyc).length === 0 ? (
              <p className="muted">No credentials issued yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Wallet</th>
                    <th>Name</th>
                    <th>Level</th>
                    <th>Issuer</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(issuedKyc).map((k) => (
                    <tr key={k.walletAddress}>
                      <td className="truncate">{k.walletAddress}</td>
                      <td>{k.fullName}</td>
                      <td>{k.level}</td>
                      <td>{k.issuer}</td>
                      <td>{new Date(k.expiry).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
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
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pending.map((r) => (
                    <tr key={r.id}>
                      <td>#{r.id}</td>
                      <td>{r.fullName || "-"}</td>
                      <td className="truncate">{r.walletAddress}</td>
                      <td>{r.type}</td>
                      <td>
                        <div className="row">
                          <button
                            type="button"
                            onClick={() =>
                              approveRequest(r.id, {
                                level: "1",
                                expiry: new Date(
                                  Date.now() +
                                    365 * 24 * 60 * 60 * 1000
                                ).toISOString(),
                                issuer: "Demo Issuer"
                              })
                            }
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
            <h2>Request history</h2>
            {processed.length === 0 ? (
              <p className="muted">
                Decisions will appear here after you approve or reject.
              </p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Type</th>
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
                      <td>{r.type}</td>
                      <td className="truncate">{r.walletAddress}</td>
                      <td>{new Date(r.updatedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IssuerDashboard;

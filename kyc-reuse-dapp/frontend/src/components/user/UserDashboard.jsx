import React, { useState } from "react";
import { useKyc } from "../../context/KycContext";

async function connectWithMetaMask() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });
  if (!accounts || accounts.length === 0) {
    throw new Error("No accounts returned from MetaMask");
  }
  return accounts[0];
}

function UserDashboard() {
  const {
    requests,
    requestKyc,
    getKycForWallet,
    userUpdateKycRequest
  } = useKyc();

  const [newForm, setNewForm] = useState({
    fullName: "",
    walletAddress: "",
    country: "",
    note: ""
  });

  const [connectedWallet, setConnectedWallet] = useState("");
  const [lookedUpWallet, setLookedUpWallet] = useState("");
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [walletError, setWalletError] = useState("");

  const handleChangeNew = (e) => {
    const { name, value } = e.target;
    setNewForm((f) => ({ ...f, [name]: value }));
  };

  const submitNewKyc = (e) => {
    e.preventDefault();
    if (!newForm.fullName || !newForm.walletAddress) return;
    requestKyc(newForm);
    setNewForm({ fullName: "", walletAddress: "", country: "", note: "" });
  };

  const handleMetaMaskConnect = async () => {
    try {
      setWalletError("");
      setLoadingWallet(true);
      const addr = await connectWithMetaMask();
      setConnectedWallet(addr);
      setLookedUpWallet(addr);
    } catch (err) {
      setWalletError(err.message || "Failed to connect MetaMask");
    } finally {
      setLoadingWallet(false);
    }
  };

  const currentKyc = getKycForWallet(lookedUpWallet);

  const requestUpdate = () => {
    if (!lookedUpWallet) return;
    userUpdateKycRequest({ walletAddress: lookedUpWallet });
  };

  const myRequests = requests.filter(
    (r) =>
      r.walletAddress &&
      lookedUpWallet &&
      r.walletAddress.toLowerCase() === lookedUpWallet.toLowerCase()
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>User portal</h1>
        <span className="page-pill">Request & manage KYC</span>
      </div>

      <div className="grid">
        {/* LEFT: manual KYC request (unchanged) */}
        <div className="card">
          <h2>Request new KYC</h2>
          <p className="muted">
            Submit a fresh KYC request that a trusted issuer can review and
            approve.
          </p>

          <form onSubmit={submitNewKyc}>
            <label>
              Full name
              <input
                type="text"
                name="fullName"
                value={newForm.fullName}
                onChange={handleChangeNew}
              />
            </label>
            <label>
              Wallet address (manual)
              <input
                type="text"
                name="walletAddress"
                value={newForm.walletAddress}
                onChange={handleChangeNew}
                placeholder="Paste address or connect via MetaMask on the right"
              />
            </label>
            <label>
              Country
              <input
                type="text"
                name="country"
                value={newForm.country}
                onChange={handleChangeNew}
              />
            </label>
            <label>
              Note
              <input
                type="text"
                name="note"
                value={newForm.note}
                onChange={handleChangeNew}
              />
            </label>

            <button type="submit">Request KYC</button>
          </form>
        </div>

        {/* RIGHT: status + two wallet options */}
        <div className="card">
          <h2>Your KYC status</h2>
          <p className="muted">
            Either connect with MetaMask or type a wallet address to check your
            credential and request an update if needed.
          </p>

          <div className="row" style={{ marginBottom: 10 }}>
            <button type="button" onClick={handleMetaMaskConnect}>
              {connectedWallet ? "Reconnect MetaMask" : "Connect with MetaMask"}
            </button>
            {loadingWallet && <span className="muted">Connecting…</span>}
          </div>

          {connectedWallet && (
            <p className="muted" style={{ marginBottom: 8 }}>
              Connected wallet: {connectedWallet}
            </p>
          )}

          {walletError && <p className="status-error">{walletError}</p>}

          <label>
            Or check another wallet (manual)
            <input
              type="text"
              value={lookedUpWallet}
              onChange={(e) => setLookedUpWallet(e.target.value)}
              placeholder="0x..."
            />
          </label>

          {/* same display for currentKyc + requests as before */}
          {currentKyc ? (
            <>
              <div style={{ marginTop: 10 }}>
                <div className="row">
                  <span className="badge badge-ok">Valid credential</span>
                  <span className="muted">
                    Level {currentKyc.level} · Issuer {currentKyc.issuer}
                  </span>
                </div>
                <p className="muted" style={{ marginTop: 8 }}>
                  Expires on{" "}
                  <strong>
                    {new Date(currentKyc.expiry).toLocaleString()}
                  </strong>
                  .
                </p>
              </div>
              <button
                type="button"
                className="secondary"
                onClick={requestUpdate}
                style={{ marginTop: 10 }}
              >
                Request KYC update
              </button>
            </>
          ) : (
            <p className="muted" style={{ marginTop: 12 }}>
              No active KYC found for this wallet.
            </p>
          )}

          <h3 style={{ marginTop: 18, fontSize: "0.95rem" }}>Your requests</h3>
          {myRequests.length === 0 ? (
            <p className="muted">No requests yet for this wallet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {myRequests.map((r) => (
                  <tr key={r.id}>
                    <td>#{r.id}</td>
                    <td>{r.type}</td>
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

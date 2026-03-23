import React from "react";
import { KycContext } from "../../context/KycContext";

function fakeConnectUserWallet() {
  // plug real MetaMask / wagmi later
  return Promise.resolve("0xbC5e96fb5eA7A16B2a533B6ecE69469d73E647EB");
}

function ServiceDashboard() {
  const { getKycForWallet } = useKyc();
  const [connectedWallet, setConnectedWallet] = React.useState("");
  const [checkingWallet, setCheckingWallet] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [credential, setCredential] = React.useState(null);

  const connectWallet = async () => {
    setLoading(true);
    const addr = await fakeConnectUserWallet();
    setConnectedWallet(addr);
    setCheckingWallet(addr);
    const kyc = getKycForWallet(addr);
    setCredential(kyc);
    setLoading(false);
  };

  const onChangeWallet = (e) => {
    const v = e.target.value;
    setCheckingWallet(v);
    setCredential(getKycForWallet(v));
  };

  const isValid =
    credential &&
    new Date(credential.expiry).getTime() > Date.now();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Service access</h1>
        <span className="page-pill">Use KYC to unlock dApps</span>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Connect wallet</h2>
          <p className="muted">
            Connect a wallet or paste an address to check whether the KYC
            credential is valid for access.
          </p>

          <div className="row" style={{ marginBottom: 10 }}>
            <button type="button" onClick={connectWallet}>
              {connectedWallet ? "Reconnect wallet" : "Connect wallet"}
            </button>
            {loading && <span className="muted">Checking…</span>}
            {connectedWallet && (
              <span className="muted">Connected: {connectedWallet}</span>
            )}
          </div>

          <label>
            Or check another wallet
            <input
              type="text"
              value={checkingWallet}
              onChange={onChangeWallet}
              placeholder="0x..."
            />
          </label>

          {!checkingWallet && (
            <p className="muted" style={{ marginTop: 10 }}>
              Enter a wallet address or connect to see KYC status.
            </p>
          )}
        </div>

        <div className="card">
          <h2>KYC gate</h2>
          {credential ? (
            <>
              <div className="row">
                <span
                  className={`badge ${isValid ? "badge-ok" : "badge-bad"}`}
                >
                  {isValid ? "KYC valid" : "KYC expired"}
                </span>
                <span className="muted">
                  Level {credential.level} · Issuer {credential.issuer}
                </span>
              </div>
              <p className="muted" style={{ marginTop: 8 }}>
                Expires on{" "}
                <strong>
                  {new Date(credential.expiry).toLocaleString()}
                </strong>
                .
              </p>

              {isValid ? (
                <div style={{ marginTop: 14 }}>
                  <p className="muted">
                    Access granted. You can now use integrated CeFi / DeFi /
                    NFT services that trust this credential.
                  </p>
                  <button type="button">Enter service</button>
                </div>
              ) : (
                <p className="status-error" style={{ marginTop: 12 }}>
                  Credential is expired. Please request an update from your
                  issuer in the user portal.
                </p>
              )}
            </>
          ) : (
            <p className="muted">
              No credential found for this wallet in the current demo state.
              Submit a KYC request as a user and have it approved by an issuer,
              then try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceDashboard;

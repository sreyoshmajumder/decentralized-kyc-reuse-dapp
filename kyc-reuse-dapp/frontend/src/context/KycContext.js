import React, { createContext, useContext, useState } from "react";

const KycContext = createContext();

export function useKyc() {
  return useContext(KycContext);
}

let nextRequestId = 1;

export function KycProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [issuedKyc, setIssuedKyc] = useState({});

  const requestKyc = (payload) => {
    const now = new Date().toISOString();
    setRequests((prev) => [
      ...prev,
      {
        id: nextRequestId++,
        status: "pending",
        createdAt: now,
        updatedAt: now,
        type: "new",
        ...payload
      }
    ]);
  };

  const userUpdateKycRequest = ({ walletAddress }) => {
    const now = new Date().toISOString();
    setRequests((prev) => [
      ...prev,
      {
        id: nextRequestId++,
        status: "pending",
        createdAt: now,
        updatedAt: now,
        type: "update",
        walletAddress
      }
    ]);
  };

  const issueOrUpdateKyc = ({ walletAddress, fullName, level, expiry, issuer }) => {
    setIssuedKyc((prev) => ({
      ...prev,
      [walletAddress]: {
        walletAddress,
        fullName,
        level,
        expiry,
        issuer,
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  const approveRequest = (id, { level, expiry, issuer }) => {
    let target;
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === id) target = r;
        return r.id === id
          ? { ...r, status: "approved", updatedAt: new Date().toISOString() }
          : r;
      })
    );
    if (target && target.walletAddress) {
      setIssuedKyc((prev) => ({
        ...prev,
        [target.walletAddress]: {
          walletAddress: target.walletAddress,
          fullName: target.fullName || "User",
          level,
          expiry,
          issuer,
          lastUpdated: new Date().toISOString()
        }
      }));
    }
  };

  const rejectRequest = (id) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status: "rejected", updatedAt: new Date().toISOString() }
          : r
      )
    );
  };

  const getKycForWallet = (walletAddress) => {
    if (!walletAddress) return null;
    const key = walletAddress.toLowerCase();
    const direct = issuedKyc[walletAddress];
    const lower = issuedKyc[key];
    return direct || lower || null;
  };

  return (
    <KycContext.Provider
      value={{
        requests,
        issuedKyc,
        requestKyc,
        userUpdateKycRequest,
        issueOrUpdateKyc,
        approveRequest,
        rejectRequest,
        getKycForWallet
      }}
    >
      {children}
    </KycContext.Provider>
  );
}

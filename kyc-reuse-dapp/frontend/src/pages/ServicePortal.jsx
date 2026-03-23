import React from "react";
import ServiceDashboard from "../components/service/ServiceDashboard";

export default function ServicePortal() {
  return (
    <div className="page">
      <div className="page-header">
        <h1>Service Provider Portal</h1>
        <span className="page-pill">For dApps & platforms</span>
      </div>
      <p className="page-subtitle">
        See how any DeFi app, NFT marketplace, or fintech platform can plug
        into the reusable KYC credential and gate access by level.
      </p>
      <div className="grid">
        <ServiceDashboard />
      </div>
    </div>
  );
}

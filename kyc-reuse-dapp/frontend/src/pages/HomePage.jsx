import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <motion.section
        className="hero"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } }
        }}
      >
        <motion.div className="hero-text" variants={fadeUp}>
          <div className="hero-kicker">Reusable KYC for Web3</div>
          <h1>Verify once. Reuse everywhere.</h1>
          <p className="hero-body">
            The Decentralized KYC Reuse Platform lets users complete KYC a
            single time with a trusted issuer and then prove compliance across
            any integrated dApp using a privacy‑preserving on‑chain credential.
          </p>

          <div className="hero-cta-row">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/user")}
            >
              Get started as user
            </motion.button>
            <motion.button
              className="secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/issuer")}
            >
              Onboard as issuer
            </motion.button>
          </div>

          <motion.div
            className="hero-metrics"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          >
            <div className="hero-metric">
              <strong>1‑time KYC</strong>
              <span className="muted">
                Eliminate repeated onboarding across exchanges and DeFi apps.
              </span>
            </div>
            <div className="hero-metric">
              <strong>Multi‑issuer</strong>
              <span className="muted">
                Support for multiple regulated KYC providers on one network.
              </span>
            </div>
            <div className="hero-metric">
              <strong>On‑chain proof</strong>
              <span className="muted">
                Soulbound‑style credential with levels &amp; expiry, no PII
                stored.
              </span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          variants={{
            hidden: { opacity: 0, scale: 0.95, rotateX: -8 },
            visible: {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              transition: { duration: 0.6 }
            }
          }}
          whileHover={{ rotateY: -4, rotateX: 4, scale: 1.01 }}
        >
          <div className="hero-chip">
            KYC once → Access CEX, DeFi, NFT, and fintech services seamlessly.
          </div>
        </motion.div>
      </motion.section>

      {/* animated stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
        style={{ marginBottom: 18 }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            fontSize: "0.78rem"
          }}
        >
          <div>
            <div className="muted">Live overview (demo)</div>
            <div style={{ fontSize: "0.86rem" }}>
              Issuers, users and services connected to the network.
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ minWidth: 90 }}
          >
            <strong>3</strong>
            <div className="muted">Issuers</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ minWidth: 90 }}
          >
            <strong>48</strong>
            <div className="muted">Verified wallets</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{ minWidth: 90 }}
          >
            <strong>12</strong>
            <div className="muted">Integrated dApps</div>
          </motion.div>
        </div>
      </motion.div>

      <section className="grid">
        {[
          {
            title: "What this platform does",
            body:
              "We separate the heavy KYC process from every individual service. Users complete verification once with a trusted issuer, which mints a non‑transferable credential. Other platforms verify it with a single on‑chain call."
          },
          {
            title: "How it works under the hood",
            body:
              "A multi‑issuer Solidity contract stores only a boolean, KYC level, and expiry per wallet. Issuers manage credentials via the Issuer Portal. Any dApp can integrate by calling isVerifiedAtLevel(address,uint8)."
          },
          {
            title: "Why this is beneficial",
            body:
              "Users avoid repeated KYC fatigue and reduce the number of places that hold their documents. Issuers keep control over revocation. Service providers get a simple API to stay compliant while keeping UX smooth."
          },
          {
            title: "Who can use this network",
            body:
              "Centralized exchanges, lending platforms, on‑ramps, NFT marketplaces, and traditional fintech apps can all plug into this identity layer to verify users once and reuse that proof everywhere."
          }
        ].map((card, idx) => (
          <motion.div
            key={card.title}
            className="card"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 * idx }}
          >
            <h2>{card.title}</h2>
            <p className="muted">{card.body}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

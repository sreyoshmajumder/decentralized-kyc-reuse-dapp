<!-- HEADER BANNER -->
<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:050f1f,40:0a1e3d,70:0f2d5c,100:071428&height=220&section=header&text=Decentralized%20KYC%20Reuse%20dApp&fontSize=32&fontColor=00c8ff&fontAlignY=45&animation=fadeIn)

<h3>🪪⚡ One Verification. Reusable Across Every Service. Built Like Binance.</h3>
<p><em>React 18 + React Router v6 + Context API + MetaMask + Solidity &nbsp;·&nbsp; Dark / Light Theme &nbsp;·&nbsp; Full KYC Workflow</em></p>

<br/>

[![React](https://img.shields.io/badge/React-18-0a1e3d?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![React Router](https://img.shields.io/badge/React%20Router-v6-0a1e3d?style=for-the-badge&logo=reactrouter&logoColor=f43f5e)](https://reactrouter.com)
[![Context API](https://img.shields.io/badge/Context%20API-AuthContext%20%2B%20KycContext-0a1e3d?style=for-the-badge&logo=react&logoColor=00c8ff)](https://react.dev/reference/react/createContext)
[![MetaMask](https://img.shields.io/badge/MetaMask-window.ethereum-0a1e3d?style=for-the-badge&logo=metamask&logoColor=f6851b)](https://metamask.io)
[![Solidity](https://img.shields.io/badge/Solidity-Smart%20Contract-0a1e3d?style=for-the-badge&logo=solidity&logoColor=00c8ff)](https://soliditylang.org)
[![CSS3](https://img.shields.io/badge/CSS3-Dark%20%2F%20Light%20Theme-0a1e3d?style=for-the-badge&logo=css3&logoColor=38bdf8)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&logoColor=white)](LICENSE)

<br/>

> **🪪 A production-inspired, full-stack demo dApp for a decentralized KYC reuse network — users register, connect MetaMask, request KYC credentials, and reuse them across services without re-verifying. Issuers review pending requests, approve or reject them, and manually issue credentials. A sleek Binance-style dark/light UI ties it all together.**

<br/>

![UI](https://img.shields.io/badge/UI-Binance--Style%20Dark%20%2F%20Light%20Theme-00c8ff?style=flat-square&labelColor=0a1e3d)
![Auth](https://img.shields.io/badge/Auth-User%20%2B%20Issuer%20Roles%20(In--Memory)-38bdf8?style=flat-square&labelColor=0a1e3d)
![Wallet](https://img.shields.io/badge/Wallet-MetaMask%20%2B%20Manual%20Address%20Input-f6851b?style=flat-square&labelColor=0a1e3d)
![State](https://img.shields.io/badge/State-React%20Context%20API-61dafb?style=flat-square&labelColor=0a1e3d)

</div>

---

## 📋 Table of Contents

| | Section |
|---|---|
| 🎯 | [What This dApp Does](#-what-this-dapp-does) |
| ✨ | [Features at a Glance](#-features-at-a-glance) |
| 🏗️ | [System Architecture](#-system-architecture) |
| 👥 | [Three Role Model](#-three-role-model) |
| 🔄 | [KYC State Machine](#-kyc-state-machine) |
| ⚛️ | [React Architecture Deep-Dive](#-react-architecture-deep-dive) |
| 🧠 | [Context API — AuthContext](#-context-api--authcontext) |
| 📋 | [Context API — KycContext](#-context-api--kyccontext) |
| 🗺️ | [Route Map](#-route-map--react-router-v6) |
| 🦊 | [MetaMask Integration](#-metamask-integration) |
| 🎨 | [Theming System](#-theming-system) |
| 🗂️ | [Project Structure](#-project-structure) |
| ⛓️ | [Smart Contract Layer](#-smart-contract-layer) |
| 🚀 | [Quick Start](#-quick-start) |
| 🔭 | [Roadmap to Production](#-roadmap-to-production) |

---

## 🎯 What This dApp Does

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   Traditional KYC is broken. This dApp shows what the fix looks like.   ║
║                                                                          ║
║   👤 USER JOURNEY                                                        ║
║   ─────────────────────────────────────────────────────────────────     ║
║   Register → Login → Connect Wallet → Request KYC → Wait for Approval   ║
║   → Credential issued with Level + Expiry + Issuer                      ║
║   → Use any integrated service instantly (no re-KYC)                    ║
║   → Credential expires? → Request update in one click                   ║
║                                                                          ║
║   🏦 ISSUER JOURNEY                                                      ║
║   ─────────────────────────────────────────────────────────────────     ║
║   Login → Choose mode:                                                   ║
║   Mode 1 → Manual Issue: enter address + level + expiry → issue         ║
║   Mode 2 → Review Requests: see pending requests → Approve / Reject     ║
║                                                                          ║
║   🔌 SERVICE JOURNEY                                                     ║
║   ─────────────────────────────────────────────────────────────────     ║
║   Connect wallet → Check KYC status → Grant or Deny access              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✨ Features at a Glance

| 🏷️ Area | ⚡ Feature | 📋 Details |
|---|---|---|
| **👤 User** | Email/Password Auth | Register + Login with in-memory session |
| **👤 User** | MetaMask Connect | `eth_requestAccounts` auto-fills wallet address |
| **👤 User** | Manual Address | Type/paste wallet address without MetaMask |
| **👤 User** | Request KYC | Submit new KYC request with name, country, note |
| **👤 User** | View Credential | See level, issuer, expiry date of current KYC |
| **👤 User** | Request Update | Re-request when credential is expired |
| **👤 User** | Request History | All past KYC requests + current status |
| **🏦 Issuer** | Issuer Login | Pre-seeded `issuer@demo.com` / `issuer` |
| **🏦 Issuer** | Manual Issue | Enter address + level + expiry → issue instantly |
| **🏦 Issuer** | Review Requests | See all pending requests from users |
| **🏦 Issuer** | Approve Request | Auto-creates credential from request data |
| **🏦 Issuer** | Reject Request | Marks request rejected with timestamp |
| **🏦 Issuer** | Request History | Full audit log with status + last updated |
| **🔌 Service** | KYC Gate | Connect wallet → valid + not expired → grant access |
| **🔌 Service** | Manual Check | Check any address without MetaMask |
| **🎨 UI** | Dark / Light Theme | CSS variables toggle stored in `localStorage` |
| **🎨 UI** | Binance-Style Layout | Professional fintech dashboard aesthetic |
| **🎨 UI** | Responsive | Cards + grid layout across all screen sizes |

---

## 🏗️ System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║               DECENTRALIZED KYC REUSE dApp — FULL ARCHITECTURE               ║
╚═══════════════════════════════════════════════════════════════════════════════╝

  ┌──────────────────────────────────────────────────────────────────────────┐
  │                   REACT 18 FRONTEND  (Create React App)                  │
  │                         http://localhost:3000                            │
  │                                                                          │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │                    Context Providers (Global State)                │  │
  │  │                                                                    │  │
  │  │   ┌────────────────────────┐   ┌────────────────────────────────┐ │  │
  │  │   │    AuthContext.js      │   │         KycContext.js          │ │  │
  │  │   │                        │   │                                │ │  │
  │  │   │  currentUser           │   │  requests: KycRequest[]        │ │  │
  │  │   │  register()            │   │  issuedKyc: {addr: Credential} │ │  │
  │  │   │  loginUser()           │   │  requestKyc()                  │ │  │
  │  │   │  loginIssuer()         │   │  approveRequest()              │ │  │
  │  │   │  logout()              │   │  rejectRequest()               │ │  │
  │  │   └────────────────────────┘   │  issueOrUpdateKyc()            │ │  │
  │  │                                │  getKycForWallet()             │ │  │
  │  │                                │  userUpdateKycRequest()        │ │  │
  │  │                                └────────────────────────────────┘ │  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  │                                                                          │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │                React Router v6 — Page Components                   │  │
  │  │                                                                    │  │
  │  │  /             → HomePage.jsx      (Binance-style landing)        │  │
  │  │  /register     → UserRegisterPage  (user onboarding)              │  │
  │  │  /login/user   → UserLoginPage     (user auth)                    │  │
  │  │  /login/issuer → IssuerLoginPage   (issuer auth)                  │  │
  │  │  /user  ──[ProtectedRoute:user]──▶  UserDashboard.jsx             │  │
  │  │  /issuer──[ProtectedRoute:issuer]─▶  IssuerDashboard.jsx          │  │
  │  │  /service      → ServiceDashboard.jsx (KYC gate)                 │  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  │                                                                          │
  │  ┌────────────────────────────────────────────────────────────────────┐  │
  │  │                Shared Components                                   │  │
  │  │  Navbar.jsx — theme toggle + nav links + auth state               │  │
  │  │  ProtectedRoute.jsx — role-based route guard                      │  │
  │  └────────────────────────────────────────────────────────────────────┘  │
  └──────────────────────────────────────────┬───────────────────────────────┘
                                             │
                     window.ethereum          │  (current: in-memory)
                     MetaMask Wallet          │  (production: smart contract)
                                             ▼
  ┌──────────────────────────────────────────────────────────────────────────┐
  │              PRODUCTION LAYER  (wiring for real deployment)              │
  │                                                                          │
  │  ┌──────────────────────┐    ┌──────────────────────────────────────┐   │
  │  │  ETHEREUM TESTNET    │    │  BACKEND AUTH (future)               │   │
  │  │                      │    │                                      │   │
  │  │  KycSBT.sol contract │    │  Replace AuthContext in-memory       │   │
  │  │  (from companion     │    │  with: Supabase / Firebase / JWT     │   │
  │  │  platform repo)      │    │  + PostgreSQL backend                │   │
  │  │                      │    │                                      │   │
  │  │  Point KycContext    │    │                                      │   │
  │  │  calls to ethers.js  │    │                                      │   │
  │  └──────────────────────┘    └──────────────────────────────────────┘   │
  └──────────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Three Role Model

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                      THREE-ROLE SYSTEM — PERMISSIONS MAP                     ║
╠══════════════════╦════════════════════════════════════════════════════════════╣
║                  ║                                                            ║
║  👤  USER        ║  Registered via /register  →  role: "user"                ║
║  ─────────────   ║  ─────────────────────────────────────────────────────    ║
║                  ║  ✅  Register + login                                      ║
║                  ║  ✅  Connect wallet (MetaMask or manual)                   ║
║                  ║  ✅  Request new KYC                                       ║
║                  ║  ✅  View own credential (level, issuer, expiry)           ║
║                  ║  ✅  Request KYC update                                    ║
║                  ║  ✅  View own request history + status                     ║
║                  ║  ❌  Cannot access /issuer route                           ║
║                  ║  ❌  Cannot issue/approve credentials                      ║
╠══════════════════╬════════════════════════════════════════════════════════════╣
║                  ║                                                            ║
║  🏦  ISSUER      ║  Pre-seeded in AuthContext  →  role: "issuer"             ║
║  ─────────────   ║  Login: issuer@demo.com / issuer                          ║
║                  ║  ─────────────────────────────────────────────────────    ║
║                  ║  ✅  Login via /login/issuer                               ║
║                  ║  ✅  Connect issuer wallet (stub / MetaMask)               ║
║                  ║  ✅  Manually issue credential for any address             ║
║                  ║  ✅  Set: walletAddress, fullName, level, expiry, issuer   ║
║                  ║  ✅  Review all pending user requests                      ║
║                  ║  ✅  Approve request → auto-creates credential             ║
║                  ║  ✅  Reject request → marks rejected with timestamp        ║
║                  ║  ✅  View full request audit log                           ║
║                  ║  ❌  Cannot access /user route                             ║
╠══════════════════╬════════════════════════════════════════════════════════════╣
║                  ║                                                            ║
║  🔌  SERVICE     ║  No auth required — open route /service                   ║
║  ─────────────   ║  ─────────────────────────────────────────────────────    ║
║                  ║  ✅  Connect wallet (MetaMask or manual address)           ║
║                  ║  ✅  getKycForWallet(addr) → check if verified + valid     ║
║                  ║  ✅  Check expiry: new Date() > credential.expiry ?        ║
║                  ║  ✅  Grant access if valid, deny if invalid/expired        ║
║                  ║  ❌  Cannot issue or modify credentials                    ║
╚══════════════════╩════════════════════════════════════════════════════════════╝
```

---

## 🔄 KYC State Machine

```
  KYC REQUEST LIFECYCLE
  ════════════════════════════════════════════════════════════════════════

  REQUEST STATES:
  ──────────────────────────────────────────────────────────────────────
  "pending"   → Request submitted, awaiting issuer review
  "approved"  → Issuer approved → credential created in issuedKyc
  "rejected"  → Issuer rejected → no credential created

  KYC CREDENTIAL FIELDS:
  ──────────────────────────────────────────────────────────────────────
  walletAddress  : "0xUser123..."     ← lowercase normalized
  fullName       : "Sreyosh Majumder"
  level          : "basic" | "standard" | "enhanced"
  expiry         : "2026-12-31"       ← ISO date string
  issuer         : "DemoIssuer"       ← issuer name string
  lastUpdated    : timestamp

  KYC REQUEST FIELDS:
  ──────────────────────────────────────────────────────────────────────
  id            : auto-generated
  status        : "pending" | "approved" | "rejected"
  type          : "new" | "update"
  walletAddress : user's wallet
  fullName      : user-submitted name
  country       : user-submitted country
  note          : optional note from user
  createdAt     : timestamp
  updatedAt     : timestamp (updated on approve/reject)

  STATE TRANSITIONS:
  ──────────────────────────────────────────────────────────────────────

     User submits request
            │
            ▼
        ┌─────────┐
        │ PENDING │ ◀── requestKyc() or userUpdateKycRequest()
        └────┬────┘
             │
     Issuer reviews
             │
     ┌───────┴───────┐
     ▼               ▼
  ┌──────────┐   ┌──────────┐
  │ APPROVED │   │ REJECTED │
  └──────────┘   └──────────┘
       │
       ▼
  Credential written to issuedKyc[walletAddress]
  → level, expiry, issuer, lastUpdated set
  → getKycForWallet(addr) now returns this credential
  → Service portal grants access ✅

  EXPIRY CHECK (Service Portal):
  ──────────────────────────────────────────────────────────────────────
  const cred = getKycForWallet(walletAddr);
  const isExpired = new Date() > new Date(cred.expiry);
  if (!cred || isExpired) → "Access Denied"
  else → "Access Granted ✅"
```

---

## ⚛️ React Architecture Deep-Dive

```
  COMPONENT HIERARCHY
  ════════════════════════════════════════════════════════════════════════

  <AuthProvider>                    ← wraps entire app
    <KycProvider>                   ← wraps entire app
      <Router>
        <App>
          <Navbar />                ← theme toggle + nav + auth state
          <Routes>
            <Route path="/"         → <HomePage />
            <Route path="/register" → <UserRegisterPage />
            <Route path="/login/user"   → <UserLoginPage />
            <Route path="/login/issuer" → <IssuerLoginPage />
            <Route path="/user"
              element={<ProtectedRoute role="user">
                         <UserDashboard />
                       </ProtectedRoute>}
            />
            <Route path="/issuer"
              element={<ProtectedRoute role="issuer">
                         <IssuerDashboard />
                       </ProtectedRoute>}
            />
            <Route path="/service"  → <ServiceDashboard />
          </Routes>
        </App>
      </Router>
    </KycProvider>
  </AuthProvider>

  PROTECTED ROUTE LOGIC (ProtectedRoute.jsx):
  ──────────────────────────────────────────────────────────────────────
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Not logged in → redirect to appropriate login page
    return role === "issuer"
      ? <Navigate to="/login/issuer" />
      : <Navigate to="/login/user" />;
  }

  if (currentUser.role !== role) {
    // Wrong role → redirect
    return role === "user"
      ? <Navigate to="/login/user" />
      : <Navigate to="/login/issuer" />;
  }

  return children; // ✅ Correct role → render the page
```

---

## 🧠 Context API — `AuthContext.js`

```javascript
// AuthContext.js — Global Authentication State
// ════════════════════════════════════════════════════════════════════

const AuthContext = createContext();

// PRE-SEEDED USERS (in-memory — replace with real backend in production)
const SEED_USERS = [
  {
    email:    "issuer@demo.com",
    password: "issuer",
    role:     "issuer",
    name:     "Demo Issuer"
  }
  // Users added dynamically via register()
];

// STATE:
// currentUser = { email, role, name } | null

// FUNCTIONS:

register({ name, email, password })
// ─────────────────────────────────────────────────────────────────────
// Adds new user to in-memory users array
// Sets currentUser with role = "user"
// Returns: success or "email already registered" error

loginUser({ email, password })
// ─────────────────────────────────────────────────────────────────────
// Finds user with matching email + password
// Requires role === "user"
// Sets currentUser → redirects to /user
// Returns: success or "invalid credentials" error

loginIssuer({ email, password })
// ─────────────────────────────────────────────────────────────────────
// Finds user with matching email + password
// Requires role === "issuer" (matches seeded issuer only)
// Sets currentUser → redirects to /issuer
// Returns: success or "invalid credentials / not issuer" error

logout()
// ─────────────────────────────────────────────────────────────────────
// Clears currentUser → redirects to /

// HOOK:
// const { currentUser, register, loginUser, loginIssuer, logout } = useAuth();
```

---

## 📋 Context API — `KycContext.js`

```javascript
// KycContext.js — Global KYC State Machine
// ════════════════════════════════════════════════════════════════════

const KycContext = createContext();

// STATE:
// requests:  KycRequest[]                  — all user-submitted requests
// issuedKyc: { [walletAddress]: Credential } — approved credentials map

// ALL FUNCTIONS:

requestKyc({ walletAddress, fullName, country, note })
// ─────────────────────────────────────────────────────────────────────
// Creates new KycRequest: { id, status:"pending", type:"new", ...fields }
// Appends to requests[]

userUpdateKycRequest({ walletAddress })
// ─────────────────────────────────────────────────────────────────────
// Creates request with type:"update" for expired/refresh scenarios
// Same flow as requestKyc but marks type as update

issueOrUpdateKyc({ walletAddress, fullName, level, expiry, issuer })
// ─────────────────────────────────────────────────────────────────────
// MANUAL issuer action — directly sets/overwrites credential
// issuedKyc[walletAddress.toLowerCase()] = { ...fields, lastUpdated: now }
// Bypasses request workflow

approveRequest(requestId, { level, expiry, issuer })
// ─────────────────────────────────────────────────────────────────────
// Finds request by id → sets status = "approved", updatedAt = now
// Writes credential to issuedKyc[req.walletAddress]
// Uses fullName from the original request

rejectRequest(requestId)
// ─────────────────────────────────────────────────────────────────────
// Finds request by id → sets status = "rejected", updatedAt = now
// Does NOT write any credential

getKycForWallet(walletAddress)
// ─────────────────────────────────────────────────────────────────────
// Returns: issuedKyc[walletAddress.toLowerCase()] | undefined
// Case-insensitive address lookup
// Used by UserDashboard + ServiceDashboard

// HOOK:
// const {
//   requests, issuedKyc,
//   requestKyc, userUpdateKycRequest,
//   issueOrUpdateKyc, approveRequest, rejectRequest, getKycForWallet
// } = useKyc();
```

---

## 🗺️ Route Map — React Router v6

```
  ALL ROUTES (App.js)
  ════════════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────────────┐
  │  PATH              COMPONENT              PROTECTION               │
  ├─────────────────────────────────────────────────────────────────────┤
  │  /                 HomePage.jsx           Public                    │
  │  /register         UserRegisterPage       Public                    │
  │  /login/user       UserLoginPage          Public                    │
  │  /login/issuer     IssuerLoginPage        Public                    │
  │  /user             UserDashboard.jsx      ProtectedRoute(role:user) │
  │  /issuer           IssuerDashboard.jsx    ProtectedRoute(role:issuer│
  │  /service          ServiceDashboard.jsx   Public (can protect later)│
  └─────────────────────────────────────────────────────────────────────┘

  REDIRECT LOGIC:
  ──────────────────────────────────────────────────────────────────────
  Not logged in  → /login/user or /login/issuer (by role)
  Wrong role     → correct login page
  Logged in user visits /service → works (no auth required)
  Logged in issuer visits /user  → redirect to /login/user

  HOME PAGE  (Binance-style landing):
  ──────────────────────────────────────────────────────────────────────
  Hero section with value proposition
  Three CTA cards:
    [Register as User]  → /register
    [Login as Issuer]   → /login/issuer
    [Try Service Gate]  → /service
```

---

## 🦊 MetaMask Integration

```javascript
  // UserDashboard.jsx — user wallet connection
  // ════════════════════════════════════════════════════════════════════

  const connectWithMetaMask = async () => {
    if (!window.ethereum) {
      // MetaMask not installed → show friendly error
      setWalletError("Please install MetaMask to connect your wallet.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
        // Triggers MetaMask popup → user approves → returns accounts array
      });
      const address = accounts[0]; // first connected account
      setWalletAddress(address);   // auto-fills the wallet input field

      // Auto-lookup existing KYC for this address
      const cred = getKycForWallet(address);
      setCredential(cred || null);
    } catch (err) {
      setWalletError("MetaMask connection rejected by user.");
    }
  };

  // Manual address input (no MetaMask needed):
  // User types/pastes 0xAddress → same getKycForWallet() lookup
  // Both paths converge to the same credential display

  // IssuerDashboard.jsx — issuer wallet (stub, easily extendable):
  const fakeIssuerWalletConnect = async () => {
    // Stub: sets a demo issuer wallet address
    // Replace with same connectWithMetaMask helper for production
    setIssuerWallet("0xIssuerDemoAddress...");
  };
  // To use real MetaMask for issuer:
  // const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  // setIssuerWallet(accounts[0]);
```

---

## 🎨 Theming System

```
  DARK / LIGHT CSS VARIABLE SYSTEM
  ════════════════════════════════════════════════════════════════════════

  App.js state: theme = "dark" | "light"
  Persisted in: localStorage key "kyc-theme"
  Applied via:  <div className={`app-root ${theme}`}>

  App.css CSS Variables:
  ──────────────────────────────────────────────────────────────────────
  :root {                           .app-root.light {
    --bg-main:    #0a1628;            --bg-main:    #f0f4f8;
    --bg-card:    #0f1f3d;            --bg-card:    #ffffff;
    --bg-nav:     #071428;            --bg-nav:     #1a3a6e;
    --accent:     #00c8ff;            --accent:     #0066cc;
    --accent-2:   #00ff88;            --accent-2:   #00aa55;
    --text-main:  #e8f4ff;            --text-main:  #1a2a3a;
    --text-soft:  #7a9ab8;            --text-soft:  #5a7090;
    --border:     #1a3a5c;            --border:     #c0d0e0;
    --success:    #00ff88;            --success:    #00aa55;
    --danger:     #ff4466;            --danger:     #cc2244;
    --warning:    #ffaa00;            --warning:    #cc8800;
  }                                 }

  TOGGLE (Navbar.jsx):
  ──────────────────────────────────────────────────────────────────────
  <button onClick={toggleTheme}>
    {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
  </button>

  // App.js toggleTheme:
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("kyc-theme", next);
  };
```

---

## 🗂️ Project Structure

```
decentralized-kyc-reuse-dapp/
│
├── 📋 README.md
│
└── 📁 kyc-reuse-dapp/                  # Main application root
    │
    ├── 📁 contracts/                   # Solidity (7.0% of codebase)
    │   └── KycSBT.sol                  # On-chain credential contract
    │
    └── 📁 frontend/                    # React 18 app (79.7% JS)
        ├── package.json                # React 18 + React Router v6
        ├── public/
        │   └── index.html
        │
        └── src/
            ├── App.js                  # Routes + theme state + providers
            ├── App.css                 # CSS variables + dark/light themes
            ├── index.js                # ReactDOM.createRoot() entry
            ├── index.css               # Base reset styles
            │
            ├── 📁 components/
            │   └── layout/
            │       └── Navbar.jsx      # Nav + theme toggle + auth links
            │
            ├── 📁 context/
            │   ├── AuthContext.js      # register/login/logout + role system
            │   └── KycContext.js       # requests + issuedKyc + all KYC ops
            │
            ├── 📁 pages/
            │   ├── HomePage.jsx        # Binance-style landing page
            │   ├── UserAuthPages.jsx   # UserLoginPage + UserRegisterPage
            │   ├── IssuerLoginPage.jsx # Issuer-specific login
            │   └── ServicePortal.jsx   # Service access gate (alias)
            │
            ├── 📁 user/
            │   ├── UserDashboard.jsx   # Wallet connect + KYC status + requests
            │   └── ProtectedRoute.jsx  # Role-based route guard
            │
            ├── 📁 issuer/
            │   └── IssuerDashboard.jsx # Manual issue + request review
            │
            └── 📁 service/
                └── ServiceDashboard.jsx # KYC validation gate
```

---

## ⛓️ Smart Contract Layer

```
  contracts/KycSBT.sol
  ════════════════════════════════════════════════════════════════════════

  The repo includes a Solidity contract for production migration.
  Currently KycContext.js uses in-memory state.
  To go on-chain: replace KycContext function bodies with ethers.js calls.

  CONTRACT INTERFACE:
  ──────────────────────────────────────────────────────────────────────
  function approveKyc(address user)  external onlyOwner
  function revokeKyc(address user)   external onlyOwner
  function isVerified(address user)  external view returns (bool)
  function verifiedAt(address user)  external view returns (uint256)

  MIGRATION MAP:
  ──────────────────────────────────────────────────────────────────────
  KycContext.issueOrUpdateKyc()   →  contract.approveKyc(addr)
  KycContext.approveRequest()     →  contract.approveKyc(addr)
  KycContext.getKycForWallet()    →  contract.isVerified(addr)
  KycContext (expiry)             →  contract.verifiedAt(addr) + period

  LANGUAGES IN REPO:
  ──────────────────────────────────────────────────────────────────────
  JavaScript  79.7%  →  React frontend
  CSS         12.5%  →  Theme system
  Solidity     7.0%  →  Smart contract
  HTML         0.8%  →  index.html shell
```

---

## 🚀 Quick Start

### 1. Clone & Navigate

```bash
git clone https://github.com/sreyoshmajumder/decentralized-kyc-reuse-dapp.git
cd decentralized-kyc-reuse-dapp/kyc-reuse-dapp/frontend
```

### 2. Install & Run

```bash
npm install
npm start
# → http://localhost:3000
```

### 3. Test All Three Flows

```
────────────────────────────────────────────────────────────
USER FLOW:
  1. → /register     Create: Name, Email, Password
  2. → /login/user   Login with your credentials
  3. → /user         Connect MetaMask OR paste a wallet address
  4.                 Click "Request KYC" → fill form → submit
  5.                 Status: PENDING ⏳

────────────────────────────────────────────────────────────
ISSUER FLOW:
  1. → /login/issuer  Email: issuer@demo.com  |  Password: issuer
  2. → /issuer        Two options:
       Option A: Manual Issue tab
                 → Enter wallet address, level, expiry, issuer name
                 → Click "Issue Credential"
       Option B: Review Requests tab
                 → See pending user requests
                 → Click "Approve" (enter level + expiry) or "Reject"

────────────────────────────────────────────────────────────
SERVICE FLOW:
  1. → /service      Connect MetaMask OR paste wallet address
  2.                 dApp checks: getKycForWallet(addr)
  3.                 Not yet approved → ❌ "Access Denied"
  4.                 After issuer approves → ✅ "Access Granted"
  5.                 Credential expired → ❌ "Access Denied (Expired)"

────────────────────────────────────────────────────────────
THEME:
  Click the 🌙 / ☀️ button in the navbar to toggle dark/light mode.
  Theme is saved in localStorage — persists across page refreshes.
```

---

## 🔭 Roadmap to Production

```
v1.0 ── CURRENT (Demo) ──────────────────────────────────────────────────
  ✅  React 18 + React Router v6 full app
  ✅  AuthContext: user + issuer role system (in-memory)
  ✅  KycContext: full request → approve/reject → credential workflow
  ✅  UserDashboard: MetaMask connect + manual input + KYC request
  ✅  IssuerDashboard: manual issue + request review panel
  ✅  ServiceDashboard: KYC gate with expiry check
  ✅  ProtectedRoute: role-based route guarding
  ✅  Dark / Light theme toggle with localStorage persistence
  ✅  Binance-style professional UI
  ✅  KycSBT.sol smart contract included

v2.0 ── REAL BACKEND AUTH ───────────────────────────────────────────────
  🔲  Replace AuthContext with JWT auth + Supabase / Firebase / Express
  🔲  Secure session management (refresh tokens, httpOnly cookies)
  🔲  Password hashing (bcrypt) — never store plain text
  🔲  Email verification on registration
  🔲  Multiple issuers support (roles + whitelist)

v3.0 ── ON-CHAIN KYC ────────────────────────────────────────────────────
  🔲  Deploy KycSBT.sol to Sepolia → replace KycContext state calls
  🔲  ethers.js integration: approveKyc() + isVerified() + verifiedAt()
  🔲  Transaction confirmation UI (loading states, tx hashes)
  🔲  Credential expiry stored on-chain
  🔲  wagmi / RainbowKit for better wallet UX

v4.0 ── SCALE & PRIVACY ─────────────────────────────────────────────────
  🔲  ZK proofs for privacy-preserving KYC verification
  🔲  Multi-tier KYC: Basic → Standard → Enhanced levels
  🔲  Cross-chain credential portability (Polygon, Arbitrum)
  🔲  SDK / npm package for service integration
  🔲  Admin dashboard for real-time KYC analytics
```

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React%2018-0a1e3d?style=for-the-badge&logo=react&logoColor=61dafb)
![React Router](https://img.shields.io/badge/React%20Router%20v6-0a1e3d?style=for-the-badge&logo=reactrouter&logoColor=f43f5e)
![Context API](https://img.shields.io/badge/Context%20API-0a1e3d?style=for-the-badge&logo=react&logoColor=00c8ff)
![MetaMask](https://img.shields.io/badge/MetaMask-0a1e3d?style=for-the-badge&logo=metamask&logoColor=f6851b)
![Solidity](https://img.shields.io/badge/Solidity-0a1e3d?style=for-the-badge&logo=solidity&logoColor=38bdf8)
![JavaScript](https://img.shields.io/badge/JavaScript-0a1e3d?style=for-the-badge&logo=javascript&logoColor=ffd700)
![CSS3](https://img.shields.io/badge/CSS3-0a1e3d?style=for-the-badge&logo=css3&logoColor=00c8ff)
![HTML5](https://img.shields.io/badge/HTML5-0a1e3d?style=for-the-badge&logo=html5&logoColor=ff6347)

</div>

---

## 👨‍💻 Author

<div align="center">

**Built with 🪪 + ⚡ + ❤️ by [Sreyosh Majumder](https://github.com/sreyoshmajumder)**

[![GitHub](https://img.shields.io/badge/GitHub-sreyoshmajumder-0a1e3d?style=for-the-badge&logo=github&logoColor=00c8ff)](https://github.com/sreyoshmajumder)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0284c7?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_LINKEDIN)

> *"Verify once. Trust everywhere. The future of digital identity is decentralized."*

</div>

---

## ⭐ Show Some Love

```
★  Star this repository
🍴  Fork it and wire up the real smart contract + backend
🐛  Open issues for bugs or feature suggestions
📢  Share with Web3 developers and FinTech engineers
```

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0f2d5c,50:0a1e3d,100:050f1f&height=120&section=footer&text=One%20Verification.%20Everywhere.&fontSize=16&fontColor=00c8ff&fontAlignY=65)

</div>

# Decentralized KYC Reuse dApp

A full-stack demo dApp for a **decentralized KYC reuse network**.  
Users register once, request KYC for their wallet, and reuse the approved credential across services. Issuers can manually issue KYC or review and approve pending user requests. Both **manual address input** and **MetaMask-based** wallet connection are supported.

---

## Features

### User side

- Email/password registration and login
- Request new KYC for a wallet address
- Two ways to provide wallet address:
  - Manually type/paste an address
  - One-click **MetaMask connect** via `eth_requestAccounts`
- View current KYC credential:
  - Level, issuer, expiry date
- See all KYC requests for the connected wallet
- Request KYC **update** when credential is expired or needs refresh

### Issuer side

- Dedicated **issuer login**
  - Demo credentials: `issuer@demo.com` / `issuer`
- Two flows:
  1. **Manual issue / update**
     - Connect issuer wallet (stub or MetaMask – easily extendable)
     - Manually enter user address, level, expiry, issuer name
     - Issue or update a credential in the in-memory KYC store
  2. **Review user requests**
     - See all **pending** KYC requests
     - Approve (auto-creates credential) or reject
     - View request history (status, type, last updated)

### Service side

- Simple **service gate** that:
  - Connects user wallet (MetaMask) or accepts manual address
  - Checks if KYC is valid and not expired
  - Grants/denies access accordingly

### UI / UX

- Binance-style landing page and dashboard layout
- Fully styled **dark / light** themes with a single toggle
- Responsive cards and grid layout for:
  - User portal
  - Issuer console
  - Service dashboard

> Note: This is a **demo only**. KYC data and credentials are stored in React state (not on-chain, no backend). Integrate a real smart contract and backend to use this in production.

---

## Tech stack

- **React 18** with React Router v6
- Context API for:
  - `AuthContext` (user / issuer auth)
  - `KycContext` (requests + issued credentials)
- CSS-only theming (light / dark) with custom design system
- MetaMask integration via `window.ethereum` (`eth_requestAccounts`)

---

## Project structure

```text
src/
  App.js
  App.css
  index.js
  index.css

  components/
    layout/
      Navbar.jsx

  context/
    AuthContext.js
    KycContext.js

  pages/
    HomePage.jsx
    UserAuthPages.jsx      // UserLoginPage + UserRegisterPage
    IssuerLoginPage.jsx
    ServicePortal.jsx      // or ServiceDashboard.jsx depending on your naming

  user/
    UserDashboard.jsx
    ProtectedRoute.jsx

  issuer/
    IssuerDashboard.jsx

  service/
    ServiceDashboard.jsx   // used as ServicePortal in App.js

Adjust file names if your local structure differs. The important part is that imports in App.js match the actual paths.
Getting started
1. Clone the repo

bash
git clone https://github.com/<your-username>/decentralized-kyc-reuse-dapp.git
cd decentralized-kyc-reuse-dapp/frontend

(If your React app lives in the root, just cd into that instead of frontend.)
2. Install dependencies

bash
npm install

3. Run the dev server

bash
npm start

The app will be available at:

    http://localhost:3000 (or your LAN IP like http://192.168.x.x:3000)

MetaMask integration

The dApp uses the browser’s injected window.ethereum object.
User wallet connection

In UserDashboard.jsx, wallet connection uses:

js
const accounts = await window.ethereum.request({
  method: "eth_requestAccounts"
});
const address = accounts;

This is used to:

    Fill the “connected wallet” field automatically

    Lookup existing KYC credential

    Attach wallet to a new KYC request or update request

If MetaMask is not installed, the UI shows a friendly error message; manual address input still works.
Extending for issuer MetaMask

Currently issuer wallet connection is implemented as a stub (fakeIssuerWalletConnect). You can replace it with the same connectWithMetaMask helper used in UserDashboard:

js
const accounts = await window.ethereum.request({
  method: "eth_requestAccounts"
});
setIssuerWallet(accounts);

Authentication model

All auth is handled purely in memory for demo purposes.
Roles

    user – regular user (registered via /register or UserRegisterPage)

    issuer – privileged issuer (pre-seeded in AuthContext)

AuthContext

    register({ name, email, password })

        Registers a new user and sets role to "user"

    loginUser({ email, password })

        Logs in as a user

    loginIssuer({ email, password })

        Logs in as an issuer (must match seeded issuer)

    logout()

        Clears the session

    currentUser

        { email, role, name } | null

Demo issuer credentials

text
Email:    issuer@demo.com
Password: issuer
Role:     issuer

You can change or add more demo users directly in AuthContext.js.
KYC model

All KYC data is also stored in memory for now.
KycContext

State:

    requests: KycRequest[]

        id, status, type ("new" | "update"), walletAddress, fullName, country, note, createdAt, updatedAt

    issuedKyc: { [walletAddress: string]: KycCredential }

        walletAddress, fullName, level, expiry, issuer, lastUpdated

API:

    requestKyc(payload)

        Creates a new "pending" KYC request

    userUpdateKycRequest({ walletAddress })

        Creates a "pending" "update" request

    issueOrUpdateKyc({ walletAddress, fullName, level, expiry, issuer })

        Manually sets/overwrites a credential for that wallet

    approveRequest(id, { level, expiry, issuer })

        Marks request as "approved" and writes a credential

    rejectRequest(id)

        Marks request as "rejected"

    getKycForWallet(walletAddress)

        Returns credential if present (case-insensitive for address)

    To move this on-chain, point these operations to your smart contract instead of local state.

Routes

Defined in App.js with React Router v6:

    / – Landing page (Home)

    /register – User registration

    /login/user – User login

    /login/issuer – Issuer login

    /user – Protected: user dashboard (role = user)

    /issuer – Protected: issuer console (role = issuer)

    /service – Service access gate (open; you can protect it later)

ProtectedRoute checks currentUser and role from AuthContext and redirects to the appropriate login page when needed.
Theming

The app uses CSS variables and app-root dark/light classes.

    App.js stores theme in state and syncs to localStorage under kyc-theme.

    App.css defines :root colors and .app-root.light overrides.

    Toggle is controlled in Navbar via a simple button.

You can tweak the theme tokens in App.css:

    --bg-main, --bg-card, --accent, --text-main, --text-soft, etc.

How to adapt this for production

This repo is meant as a starter / demo. To use it as a real KYC network:

    Replace in-memory KYC with contract calls

        Deploy a smart contract that stores:

            Boolean KYC status

            Level, expiry, issuer address

        Connect via ethers.js or wagmi to read/write on-chain.

    Add a backend for auth

        Replace the in-memory auth with JWT-based auth + DB (Supabase, Firebase, custom).

    Handle PII carefully

        Never store raw PII on-chain.

        Use off-chain storage + hashes or ZK proofs where appropriate.

    Harden issuer flows

        Restrict issuance to whitelisted issuer addresses.

        Audit the issuer UI and signing logic.

Scripts

Common npm scripts:

bash
npm start       # start dev server
npm run build   # production build
npm test        # (optional) run tests if you add them

License

MIT – feel free to use, modify, and extend for your own hackathons, demos, or prototypes.

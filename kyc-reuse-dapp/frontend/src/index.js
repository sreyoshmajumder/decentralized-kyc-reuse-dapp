import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { KycProvider } from "./context/KycContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <KycProvider>
        <App />
      </KycProvider>
    </AuthProvider>
  </React.StrictMode>
);

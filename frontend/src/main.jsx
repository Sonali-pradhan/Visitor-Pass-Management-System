import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { VisitorProvider } from "./context/VisitorContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { PassProvider } from "./context/PassContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <VisitorProvider>
        <AppointmentProvider>
          <PassProvider>
            <App />
          </PassProvider>
        </AppointmentProvider>
      </VisitorProvider>
    </AuthProvider>
  </React.StrictMode>
);
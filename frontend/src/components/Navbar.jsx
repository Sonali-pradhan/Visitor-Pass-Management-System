import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiClock, FiUser, FiLogOut, FiShield, FiBell } from "react-icons/fi";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        height: "70px",
        background: "rgba(15, 23, 42, 0.9)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--glass-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Brand Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px var(--primary-glow)",
          }}
        >
          <FiShield style={{ fontSize: "1.3rem", color: "#ffffff" }} />
        </div>
        <div>
          <h2 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
            GateKeeper Pro
          </h2>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: "500" }}>
            Smart Visitor & Pass Management
          </span>
        </div>
      </div>

      {/* Center Live Gate Clock */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(255, 255, 255, 0.05)",
          padding: "0.4rem 0.9rem",
          borderRadius: "9999px",
          border: "1px solid var(--glass-border)",
          fontSize: "0.85rem",
          fontFamily: "var(--font-mono)",
          color: "var(--accent-cyan)",
        }}
      >
        <FiClock /> {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
      </div>

      {/* User Info & Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FiBell style={{ fontSize: "1.2rem", color: "var(--text-muted)" }} />
          <span
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              width: "8px",
              height: "8px",
              background: "var(--accent-rose)",
              borderRadius: "50%",
            }}
          />
        </div>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ textAlign: "right" }}>
              <span style={{ display: "block", fontSize: "0.85rem", fontWeight: "700", color: "#ffffff" }}>
                {user.name}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  color:
                    user.role === "admin"
                      ? "var(--accent-amber)"
                      : user.role === "security"
                      ? "var(--accent-cyan)"
                      : "var(--accent-emerald)",
                }}
              >
                {user.role} Mode
              </span>
            </div>

            <button
              className="btn btn-secondary"
              onClick={handleLogout}
              title="Logout"
              style={{ padding: "0.5rem", borderRadius: "8px" }}
            >
              <FiLogOut />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiUser style={{ color: "var(--text-muted)" }} />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Guest Mode</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  FiShield,
  FiLock,
  FiMail,
  FiArrowRight,
  FiCheckCircle,
  FiCamera,
  FiMonitor,
  FiUsers,
  FiAward,
} from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      if (res.user.role === "security") {
        navigate("/security-dashboard");
      } else if (res.user.role === "employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("123456");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        background: "#080c14",
        overflow: "hidden",
      }}
    >
      {/* Left Panel: High-Impact Realistic Campus Showcase */}
      <div
        style={{
          flex: "1.2",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3.5rem",
          backgroundImage: `linear-gradient(135deg, rgba(8, 12, 20, 0.92) 0%, rgba(15, 23, 42, 0.82) 50%, rgba(8, 12, 20, 0.95) 100%), url('/university_hero.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRight: "1px solid var(--glass-border)",
        }}
      >
        {/* Top Crest Branding */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px var(--primary-glow)",
            }}
          >
            <FiShield style={{ fontSize: "1.6rem", color: "#ffffff" }} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em" }}>
              CAMPUS SECURITY & PASS SYSTEM
            </h2>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Official University Visitor Portal
            </span>
          </div>
        </div>

        {/* Hero Middle Content */}
        <div style={{ maxWidth: "600px", margin: "2rem 0" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid var(--primary-glow)",
              color: "#818cf8",
              fontSize: "0.8rem",
              fontWeight: "700",
              marginBottom: "1.25rem",
            }}
          >
            <FiAward /> Next-Gen Smart Campus Safety Standard
          </div>

          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "800",
              lineHeight: 1.15,
              color: "#ffffff",
              marginBottom: "1.25rem",
              letterSpacing: "-0.03em",
            }}
          >
            Intelligent Campus Access & Instant QR Visitor Badging
          </h1>

          <p style={{ fontSize: "1.05rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "2rem" }}>
            Streamlined visitor pre-booking, facial webcam photo verification, automated faculty host approvals, and real-time gate security telemetry.
          </p>

          {/* Feature Highlights Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(12px)",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--glass-border)",
              }}
            >
              <FiCheckCircle style={{ color: "#34d399", fontSize: "1.4rem" }} />
              <div>
                <strong style={{ display: "block", fontSize: "0.85rem", color: "#ffffff" }}>Instant QR Badges</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Downloadable PDF passes</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(12px)",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--glass-border)",
              }}
            >
              <FiCamera style={{ color: "var(--accent-cyan)", fontSize: "1.4rem" }} />
              <div>
                <strong style={{ display: "block", fontSize: "0.85rem", color: "#ffffff" }}>Facial Photo Audit</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Live webcam snapshot</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(12px)",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--glass-border)",
              }}
            >
              <FiUsers style={{ color: "var(--accent-purple)", fontSize: "1.4rem" }} />
              <div>
                <strong style={{ display: "block", fontSize: "0.85rem", color: "#ffffff" }}>Faculty Approvals</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Host notification workflow</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(15, 23, 42, 0.65)",
                backdropFilter: "blur(12px)",
                padding: "0.85rem 1rem",
                borderRadius: "12px",
                border: "1px solid var(--glass-border)",
              }}
            >
              <FiMonitor style={{ color: "var(--accent-amber)", fontSize: "1.4rem" }} />
              <div>
                <strong style={{ display: "block", fontSize: "0.85rem", color: "#ffffff" }}>Lobby Kiosk Mode</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Touchscreen guest check-in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats Strip */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div>
            <span style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff" }}>1,250+</span>
            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Daily Campus Passes</span>
          </div>
          <div>
            <span style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--accent-emerald)" }}>99.9%</span>
            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Verification Accuracy</span>
          </div>
          <div>
            <span style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--accent-cyan)" }}>24 / 7</span>
            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>Active Security Monitoring</span>
          </div>
        </div>
      </div>

      {/* Right Panel: Sleek Authentication Form */}
      <div
        style={{
          width: "480px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "3rem",
          background: "rgba(11, 15, 25, 0.95)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div className="glass-card" style={{ padding: "2.5rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#ffffff", marginBottom: "0.35rem" }}>
              Sign In to Workstation
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Enter your credentials to access your security role portal.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FiMail /> Workstation Email
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="e.g. admin@system.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FiLock /> Account Password
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.9rem", fontSize: "1rem" }} disabled={loading}>
              {loading ? "Authenticating..." : "Access Workstation"} <FiArrowRight />
            </button>
          </form>

          {/* Quick Demo Role Selector */}
          <div style={{ marginTop: "1.75rem", paddingTop: "1.25rem", borderTop: "1px solid var(--glass-border)", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "700" }}>
              Quick 1-Click Role Accounts
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", marginTop: "0.75rem" }}>
              <button
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.45rem", justifyContent: "center" }}
                onClick={() => handleQuickDemo("admin@system.com")}
              >
                👑 Admin
              </button>
              <button
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.45rem", justifyContent: "center" }}
                onClick={() => handleQuickDemo("security@system.com")}
              >
                🛡️ Security
              </button>
              <button
                className="btn btn-secondary"
                style={{ fontSize: "0.75rem", padding: "0.45rem", justifyContent: "center" }}
                onClick={() => handleQuickDemo("employee@system.com")}
              >
                🎓 Host
              </button>
            </div>
          </div>

          <p style={{ marginTop: "1.75rem", textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Need a workstation account?{" "}
            <Link to="/register" style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}>
              Register Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
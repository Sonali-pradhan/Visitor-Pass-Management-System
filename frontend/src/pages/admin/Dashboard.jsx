import { useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import { AppointmentContext } from "../../context/AppointmentContext";
import { PassContext } from "../../context/PassContext";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiClock,
  FiCreditCard,
  FiActivity,
  FiUserCheck,
  FiUserPlus,
  FiShield,
  FiCalendar,
} from "react-icons/fi";

function Dashboard() {
  const { visitors } = useContext(VisitorContext);
  const { appointments } = useContext(AppointmentContext);
  const { passes } = useContext(PassContext);

  const insideCount = visitors.filter((v) => v.status === "inside").length;
  const pendingCount = visitors.filter((v) => v.status === "pending").length;
  const activePasses = passes.filter((p) => p.status === "active").length;

  const maxCapacity = 100;
  const occupancyRate = Math.min(Math.round((insideCount / maxCapacity) * 100), 100);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" }}>
        <div>
          <h1 className="page-title">Executive Control Center</h1>
          <p className="page-subtitle">Real-time facility occupancy, visitor verification, and access telemetry.</p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/add-visitor" className="btn btn-primary">
            <FiUserPlus /> Register Visitor
          </Link>
          <Link to="/checkin" className="btn btn-secondary">
            <FiShield /> Gate Scanner
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>CURRENTLY INSIDE</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
              <FiUserCheck style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", display: "flex", alignItems: "center", gap: "0.6rem" }}>
            {insideCount}
            <span className="pulse-green" />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-emerald)", marginTop: "0.4rem" }}>
            Live Occupancy Status
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>TOTAL VISITORS</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>
              <FiUsers style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
            {visitors.length}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
            Registered Records
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>PENDING APPROVALS</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(245, 158, 11, 0.15)", color: "#fbbf24" }}>
              <FiClock style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
            {pendingCount}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-amber)", marginTop: "0.4rem" }}>
            Requires Host Review
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>ACTIVE PASSES</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8" }}>
              <FiCreditCard style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
            {activePasses}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", marginTop: "0.4rem" }}>
            Valid Security QR Badges
          </p>
        </div>
      </div>

      {/* Building Occupancy Progress & Activity Split */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FiActivity style={{ color: "var(--primary)" }} /> Facility Occupancy Meter
            </h3>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{insideCount} / {maxCapacity} Max</span>
          </div>

          {/* Progress bar */}
          <div style={{ width: "100%", height: "14px", background: "rgba(255, 255, 255, 0.08)", borderRadius: "999px", overflow: "hidden", marginBottom: "1rem" }}>
            <div
              style={{
                width: `${occupancyRate}%`,
                height: "100%",
                background: "linear-gradient(90deg, #6366f1, #06b6d4, #10b981)",
                borderRadius: "999px",
                transition: "width 0.5s ease",
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <span>Status: Optimal Safety Limits</span>
            <span>{occupancyRate}% Capacity Used</span>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem" }}>Quick Actions</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <Link to="/add-appointment" className="btn btn-secondary" style={{ flexDirection: "column", padding: "1rem", fontSize: "0.8rem" }}>
              <FiCalendar style={{ fontSize: "1.4rem", color: "var(--accent-purple)" }} /> Pre-Book Visit
            </Link>
            <Link to="/generate-pass" className="btn btn-secondary" style={{ flexDirection: "column", padding: "1rem", fontSize: "0.8rem" }}>
              <FiCreditCard style={{ fontSize: "1.4rem", color: "var(--accent-cyan)" }} /> Pass Studio
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="glass-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Live Gate Log Feed</h3>
          <Link to="/visitors" style={{ color: "var(--primary)", fontSize: "0.85rem", textDecoration: "none", fontWeight: "600" }}>
            View All Visitors →
          </Link>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Pass ID</th>
                <th>Host</th>
                <th>Department</th>
                <th>Purpose</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visitors.slice(0, 5).map((v) => (
                <tr key={v._id || v.passId}>
                  <td style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {v.photo ? (
                      <img src={v.photo} alt={v.name} className="visitor-avatar-sm" />
                    ) : (
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "var(--primary-glow)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "700",
                          fontSize: "0.85rem",
                          color: "var(--primary)",
                        }}
                      >
                        {v.name ? v.name.charAt(0) : "V"}
                      </div>
                    )}
                    <div>
                      <strong style={{ display: "block", color: "var(--text-main)" }}>{v.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{v.company || "Guest"}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: "600", color: "#818cf8" }}>
                      {v.passId}
                    </span>
                  </td>
                  <td>{v.hostName || "Admin"}</td>
                  <td>{v.department || "General"}</td>
                  <td>{v.purpose}</td>
                  <td>
                    <span className={`badge badge-${v.status}`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
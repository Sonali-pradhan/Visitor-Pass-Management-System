import { useState, useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import { Link } from "react-router-dom";
import QRScannerModal from "../../components/QRScannerModal";
import {
  FiShield,
  FiCamera,
  FiUserCheck,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

function SecurityDashboard() {
  const { visitors, checkInVisitor } = useContext(VisitorContext);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const insideCount = visitors.filter((v) => v.status === "inside").length;
  const approvedCount = visitors.filter((v) => v.status === "approved").length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" }}>
        <div>
          <h1 className="page-title">Guard Gate Terminal</h1>
          <p className="page-subtitle">Rapid access control, live QR verification, and gate log monitoring.</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsScannerOpen(true)}>
          <FiCamera /> Launch QR Camera Scanner
        </button>
      </div>

      {/* Security Action Hub Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <Link to="/checkin" className="glass-card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>ACTIVE INSIDE</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", color: "#34d399" }}>
              <FiUserCheck style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
            {insideCount}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-emerald)", marginTop: "0.4rem" }}>
            Open Gate Console →
          </p>
        </Link>

        <Link to="/visitors" className="glass-card" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>PRE-APPROVED QUEUE</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(6, 182, 212, 0.15)", color: "#38bdf8" }}>
              <FiUsers style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff" }}>
            {approvedCount}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", marginTop: "0.4rem" }}>
            Ready For Gate Check-In →
          </p>
        </Link>

        <div className="glass-card" onClick={() => setIsScannerOpen(true)} style={{ cursor: "pointer" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>SCAN QR BADGE</span>
            <div style={{ padding: "0.5rem", borderRadius: "10px", background: "rgba(99, 102, 241, 0.15)", color: "#818cf8" }}>
              <FiCamera style={{ fontSize: "1.3rem" }} />
            </div>
          </div>
          <div style={{ fontSize: "1.2rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem" }}>
            Instant Camera Scan
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--primary)", marginTop: "0.4rem" }}>
            Click to activate scanner
          </p>
        </div>
      </div>

      {/* Pre-approved Quick Checkin */}
      <div className="glass-card">
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.25rem" }}>
          ⚡ 1-Click Pre-Approved Entry Gate
        </h3>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Pass ID</th>
                <th>Host Employee</th>
                <th>Department</th>
                <th style={{ textAlign: "right" }}>Gate Action</th>
              </tr>
            </thead>
            <tbody>
              {visitors.filter((v) => v.status === "approved").length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)" }}>
                    No pre-approved visitors waiting at the gate.
                  </td>
                </tr>
              ) : (
                visitors
                  .filter((v) => v.status === "approved")
                  .map((v) => (
                    <tr key={v.passId}>
                      <td style={{ fontWeight: "700" }}>{v.name}</td>
                      <td>
                        <span style={{ fontFamily: "var(--font-mono)", color: "#818cf8" }}>{v.passId}</span>
                      </td>
                      <td>{v.hostName || "N/A"}</td>
                      <td>{v.department || "General"}</td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="btn btn-success"
                          style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                          onClick={() => checkInVisitor(v.passId)}
                        >
                          <FiCheckCircle /> Allow Entry
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={(passId) => checkInVisitor(passId)}
      />
    </div>
  );
}

export default SecurityDashboard;
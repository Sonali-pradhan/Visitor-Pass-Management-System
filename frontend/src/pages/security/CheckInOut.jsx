import { useState, useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import QRScannerModal from "../../components/QRScannerModal";
import {
  FiCamera,
  FiSearch,
  FiCheckCircle,
  FiLogOut,
  FiShield,
  FiClock,
  FiUserCheck,
} from "react-icons/fi";

function CheckInOut() {
  const { visitors, checkInVisitor, checkOutVisitor } = useContext(VisitorContext);
  const [passInput, setPassInput] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const insideVisitors = visitors.filter((v) => v.status === "inside");
  const readyVisitors = visitors.filter((v) => v.status === "approved" || v.status === "outside" || v.status === "pending");

  const handleManualCheckIn = (passIdToProcess) => {
    const id = passIdToProcess || passInput.trim();
    if (!id) return;

    const target = visitors.find((v) => v.passId.toLowerCase() === id.toLowerCase());
    if (!target) {
      setAlertMsg("❌ Invalid Pass ID: Record not found.");
      setTimeout(() => setAlertMsg(""), 3500);
      return;
    }

    if (target.status === "inside") {
      checkOutVisitor(target.passId);
      setAlertMsg(`✅ ${target.name} checked OUT successfully.`);
    } else {
      checkInVisitor(target.passId);
      setAlertMsg(`🚀 ${target.name} checked IN successfully.`);
    }

    setPassInput("");
    setTimeout(() => setAlertMsg(""), 3500);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" }}>
        <div>
          <h1 className="page-title">Gate Security Portal</h1>
          <p className="page-subtitle">Scan QR badges, verify visitor identity, and monitor real-time building occupancy.</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsScannerOpen(true)}>
          <FiCamera /> Launch Live QR Scanner
        </button>
      </div>

      {/* Alert Toast Notification */}
      {alertMsg && (
        <div
          style={{
            padding: "1rem 1.25rem",
            borderRadius: "12px",
            background: alertMsg.includes("❌") ? "rgba(244, 63, 94, 0.2)" : "rgba(16, 185, 129, 0.2)",
            border: alertMsg.includes("❌") ? "1px solid rgba(244, 63, 94, 0.4)" : "1px solid rgba(16, 185, 129, 0.4)",
            marginBottom: "1.5rem",
            fontWeight: "700",
            fontSize: "0.95rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {alertMsg}
        </div>
      )}

      {/* Quick Gate Action Bar */}
      <div className="glass-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FiShield style={{ color: "var(--accent-cyan)" }} /> Express Pass Verification & Check-In / Out
        </h3>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <FiSearch style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              type="text"
              className="input-field"
              placeholder="Enter Pass ID (e.g. VP-882194) or scan barcode..."
              style={{ paddingLeft: "2.5rem" }}
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleManualCheckIn()}
            />
          </div>
          <button className="btn btn-primary" onClick={() => handleManualCheckIn()}>
            Execute Toggle
          </button>
        </div>
      </div>

      {/* Occupants Inside Building Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Currently Inside */}
        <div className="glass-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FiUserCheck style={{ color: "var(--accent-emerald)" }} /> Inside Building ({insideVisitors.length})
            </h3>
            <span className="pulse-green" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {insideVisitors.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "1.5rem" }}>
                No active visitors inside at the moment.
              </p>
            ) : (
              insideVisitors.map((v) => (
                <div
                  key={v._id || v.passId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    background: "rgba(15, 23, 42, 0.6)",
                    borderRadius: "12px",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
                          color: "var(--primary)",
                        }}
                      >
                        {v.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <strong style={{ display: "block", color: "var(--text-main)" }}>{v.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                        {v.passId} | Host: {v.hostName || "N/A"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                    onClick={() => checkOutVisitor(v.passId)}
                  >
                    <FiLogOut /> Check Out
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Ready For Check-In */}
        <div className="glass-card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiClock style={{ color: "var(--accent-amber)" }} /> Expected / Pre-Approved ({readyVisitors.length})
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {readyVisitors.length === 0 ? (
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", padding: "1.5rem" }}>
                No expected visitors queue.
              </p>
            ) : (
              readyVisitors.map((v) => (
                <div
                  key={v._id || v.passId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.85rem 1rem",
                    background: "rgba(15, 23, 42, 0.6)",
                    borderRadius: "12px",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <div>
                    <strong style={{ display: "block", color: "var(--text-main)" }}>{v.name}</strong>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
                      {v.passId} | {v.purpose}
                    </span>
                  </div>

                  <button
                    className="btn btn-success"
                    style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                    onClick={() => checkInVisitor(v.passId)}
                  >
                    <FiCheckCircle /> Check In
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={(passId) => handleManualCheckIn(passId)}
      />
    </div>
  );
}

export default CheckInOut;
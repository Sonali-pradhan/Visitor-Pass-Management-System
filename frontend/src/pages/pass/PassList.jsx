import { useState, useContext } from "react";
import { PassContext } from "../../context/PassContext";
import PassBadgeCard from "../../components/PassBadgeCard";
import { FiEye, FiSlash, FiX, FiCreditCard } from "react-icons/fi";

function PassList() {
  const { passes, revokePass } = useContext(PassContext);
  const [selectedPass, setSelectedPass] = useState(null);

  return (
    <div>
      <h1 className="page-title">Issued Pass Registry</h1>
      <p className="page-subtitle">Inspect active security badges, verify validity dates, and revoke compromised passes.</p>

      <div className="glass-card">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Pass ID</th>
                <th>Visitor</th>
                <th>Host Employee</th>
                <th>Department</th>
                <th>Pass Tier</th>
                <th>Valid Until</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {passes.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                    No security passes generated yet.
                  </td>
                </tr>
              ) : (
                passes.map((pass) => (
                  <tr key={pass.passId}>
                    <td>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "600", color: "#818cf8" }}>
                        {pass.passId}
                      </span>
                    </td>
                    <td style={{ fontWeight: "700" }}>{pass.visitorName}</td>
                    <td>{pass.hostName}</td>
                    <td>{pass.department || "General"}</td>
                    <td>
                      <span
                        style={{
                          padding: "0.2rem 0.6rem",
                          borderRadius: "6px",
                          fontSize: "0.75rem",
                          background: "rgba(99, 102, 241, 0.15)",
                          color: "#818cf8",
                          border: "1px solid var(--primary-glow)",
                          fontWeight: "600",
                        }}
                      >
                        {pass.passType || "Standard"}
                      </span>
                    </td>
                    <td>{new Date(pass.validTo).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${pass.status === "active" ? "approved" : "rejected"}`}>
                        {pass.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                          onClick={() => setSelectedPass(pass)}
                          title="View Digital Badge"
                        >
                          <FiEye /> View Badge
                        </button>
                        {pass.status === "active" && (
                          <button
                            className="btn btn-danger"
                            style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                            onClick={() => revokePass(pass.passId)}
                            title="Revoke Access Pass"
                          >
                            <FiSlash /> Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPass && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setSelectedPass(null)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              <FiX />
            </button>
            <PassBadgeCard visitorPass={selectedPass} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PassList;
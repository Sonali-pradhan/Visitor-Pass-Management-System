import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { VisitorContext } from "../../context/VisitorContext";
import { AppointmentContext } from "../../context/AppointmentContext";
import { Link } from "react-router-dom";
import { FiUsers, FiCalendar, FiCheck, FiX, FiUserPlus } from "react-icons/fi";

function EmployeeDashboard() {
  const { user } = useContext(AuthContext);
  const { visitors, updateStatus } = useContext(VisitorContext);
  const { appointments } = useContext(AppointmentContext);

  const currentHostName = user?.name || "Dr. Sarah Jenkins";

  const myVisitors = visitors.filter(
    (v) => v.hostName === currentHostName || v.hostName?.includes("Sarah") || !v.hostName
  );
  const myAppointments = appointments.filter(
    (apt) => apt.hostName === currentHostName || apt.hostName?.includes("Sarah") || !apt.hostName
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" }}>
        <div>
          <h1 className="page-title">Employee Host Workstation</h1>
          <p className="page-subtitle">Welcome back, {currentHostName}. Manage your incoming visitor approvals and schedule appointments.</p>
        </div>

        <Link to="/add-appointment" className="btn btn-primary">
          <FiCalendar /> Pre-Book Guest Visit
        </Link>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "2rem",
        }}
      >
        <div className="glass-card">
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>MY TOTAL VISITORS</span>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem" }}>
            {myVisitors.length}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", marginTop: "0.4rem" }}>
            Assigned Guests
          </p>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>PENDING MY APPROVAL</span>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem" }}>
            {myVisitors.filter((v) => v.status === "pending").length}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-amber)", marginTop: "0.4rem" }}>
            Action Required
          </p>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "600" }}>SCHEDULED APPOINTMENTS</span>
          <div style={{ fontSize: "2.2rem", fontWeight: "800", color: "#ffffff", marginTop: "0.5rem" }}>
            {myAppointments.length}
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--accent-purple)", marginTop: "0.4rem" }}>
            Upcoming Pre-Bookings
          </p>
        </div>
      </div>

      {/* Pending Arrival Requests Table */}
      <div className="glass-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "1.25rem" }}>
          🛎️ Incoming Visitor Arrival Requests
        </h3>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Company</th>
                <th>Purpose</th>
                <th>Pass ID</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Host Approval</th>
              </tr>
            </thead>
            <tbody>
              {myVisitors.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)" }}>
                    No pending visitor approval requests.
                  </td>
                </tr>
              ) : (
                myVisitors.map((v) => (
                  <tr key={v._id || v.passId}>
                    <td>
                      <strong style={{ display: "block", color: "var(--text-main)" }}>{v.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{v.phone}</span>
                    </td>
                    <td>{v.company || "Independent"}</td>
                    <td>{v.purpose}</td>
                    <td>
                      <span style={{ fontFamily: "var(--font-mono)", color: "#818cf8" }}>{v.passId}</span>
                    </td>
                    <td>
                      <span className={`badge badge-${v.status}`}>
                        {v.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      {v.status === "pending" ? (
                        <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                          <button
                            className="btn btn-success"
                            style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                            onClick={() => updateStatus(v._id || v.passId, "approved")}
                          >
                            <FiCheck /> Approve
                          </button>
                          <button
                            className="btn btn-danger"
                            style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                            onClick={() => updateStatus(v._id || v.passId, "rejected")}
                          >
                            <FiX /> Decline
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
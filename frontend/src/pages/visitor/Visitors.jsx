import { useState, useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import { AuthContext } from "../../context/AuthContext";
import PassBadgeCard from "../../components/PassBadgeCard";
import {
  FiSearch,
  FiFilter,
  FiCheck,
  FiX,
  FiEye,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";

function Visitors() {
  const { visitors, updateStatus, deleteVisitor, checkInVisitor, checkOutVisitor } =
    useContext(VisitorContext);
  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPassVisitor, setSelectedPassVisitor] = useState(null);

  const filteredVisitors = visitors.filter((v) => {
    // Role Scoping: Employees only see visitors assigned to them
    if (user?.role === "employee") {
      const isMyGuest = v.hostName === user.name || (v.hostName && v.hostName.includes(user.name.split(" ")[0])) || !v.hostName;
      if (!isMyGuest) return false;
    }

    const matchesSearch =
      (v.name && v.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.passId && v.passId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.company && v.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.phone && v.phone.includes(searchTerm));

    const matchesStatus =
      statusFilter === "all" || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = "Pass ID,Name,Email,Phone,Company,Department,Host,Purpose,Status\n";
    const rows = filteredVisitors
      .map(
        (v) =>
          `"${v.passId || ""}","${v.name || ""}","${v.email || ""}","${v.phone || ""}","${v.company || ""}","${v.department || ""}","${v.hostName || ""}","${v.purpose || ""}","${v.status || ""}"`
      )
      .join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Visitor_Log_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" }}>
        <div>
          <h1 className="page-title">Visitor Master Directory</h1>
          <p className="page-subtitle">Search, verify access passes, update visit status, and export security logs.</p>
        </div>

        <button className="btn btn-secondary" onClick={exportToCSV}>
          <FiDownload /> Export CSV Log
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div
        className="glass-card"
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1.5rem",
          padding: "1rem 1.25rem",
        }}
      >
        <div style={{ flex: 1, position: "relative" }}>
          <FiSearch
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Search by name, Pass ID, company, or phone..."
            style={{ paddingLeft: "2.5rem" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <FiFilter style={{ color: "var(--text-muted)" }} />
          <select
            className="select-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ minWidth: "150px" }}
          >
            <option value="all">All Statuses</option>
            <option value="inside">Currently Inside</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Review</option>
            <option value="outside">Checked Out</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Visitors Table */}
      <div className="glass-card">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Pass ID</th>
                <th>Host Employee</th>
                <th>Department</th>
                <th>Purpose</th>
                <th>Check-In Time</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                    No visitor records match your query.
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((v) => (
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
                        <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                          {v.phone} | {v.company || "Independent"}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: "600", color: "#818cf8" }}>
                        {v.passId}
                      </span>
                    </td>

                    <td>{v.hostName || "N/A"}</td>
                    <td>{v.department || "General"}</td>
                    <td>{v.purpose}</td>

                    <td>
                      {v.checkInTime
                        ? new Date(v.checkInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                        : "Not In"}
                    </td>

                    <td>
                      <span className={`badge badge-${v.status}`}>
                        {v.status}
                      </span>
                    </td>

                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                          onClick={() => setSelectedPassVisitor(v)}
                          title="View Digital Badge"
                        >
                          <FiEye />
                        </button>

                        {v.status === "pending" && (
                          <>
                            <button
                              className="btn btn-success"
                              style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                              onClick={() => updateStatus(v._id || v.passId, "approved")}
                              title="Approve Visit"
                            >
                              <FiCheck />
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                              onClick={() => updateStatus(v._id || v.passId, "rejected")}
                              title="Reject Visit"
                            >
                              <FiX />
                            </button>
                          </>
                        )}

                        {v.status === "approved" && (
                          <button
                            className="btn btn-success"
                            style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                            onClick={() => checkInVisitor(v.passId)}
                          >
                            Check In
                          </button>
                        )}

                        {v.status === "inside" && (
                          <button
                            className="btn btn-danger"
                            style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                            onClick={() => checkOutVisitor(v.passId)}
                          >
                            Check Out
                          </button>
                        )}

                        {user?.role === "admin" && (
                          <button
                            className="btn btn-secondary"
                            style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem", color: "var(--accent-rose)" }}
                            onClick={() => deleteVisitor(v._id || v.passId)}
                            title="Delete Record (Admin)"
                          >
                            <FiTrash2 />
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

      {/* Badge Preview Modal */}
      {selectedPassVisitor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setSelectedPassVisitor(null)}
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
            <PassBadgeCard visitorPass={selectedPassVisitor} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Visitors;
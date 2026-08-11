import { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import { FiCheck, FiX, FiTrash2 } from "react-icons/fi";

function AppointmentList() {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useContext(AppointmentContext);

  return (
    <div>
      <h1 className="page-title">Pre-Booked Appointments Master</h1>
      <p className="page-subtitle">Review scheduled visits, confirm host approvals, and convert appointments to active passes.</p>

      <div className="glass-card">
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Company</th>
                <th>Host Employee</th>
                <th>Department</th>
                <th>Visit Date</th>
                <th>Time Slot</th>
                <th>Purpose</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                    No pre-booked appointments found.
                  </td>
                </tr>
              ) : (
                appointments.map((apt) => (
                  <tr key={apt._id}>
                    <td>
                      <strong style={{ display: "block", color: "var(--text-main)" }}>{apt.visitorName}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{apt.visitorEmail}</span>
                    </td>
                    <td>{apt.company || "Independent"}</td>
                    <td>{apt.hostName}</td>
                    <td>{apt.department || "General"}</td>
                    <td>{apt.date}</td>
                    <td>{apt.timeSlot || "Flexible"}</td>
                    <td>{apt.purpose}</td>
                    <td>
                      <span className={`badge badge-${apt.status}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.4rem", justifyContent: "flex-end" }}>
                        {apt.status === "pending" && (
                          <>
                            <button
                              className="btn btn-success"
                              style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                              onClick={() => updateAppointmentStatus(apt._id, "approved")}
                              title="Approve Pre-Booking"
                            >
                              <FiCheck />
                            </button>
                            <button
                              className="btn btn-danger"
                              style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                              onClick={() => updateAppointmentStatus(apt._id, "rejected")}
                              title="Reject Pre-Booking"
                            >
                              <FiX />
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "0.4rem 0.6rem", fontSize: "0.8rem", color: "var(--accent-rose)" }}
                          onClick={() => deleteAppointment(apt._id)}
                          title="Delete Appointment"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
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

export default AppointmentList;
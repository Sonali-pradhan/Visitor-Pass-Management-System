import { useState, useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import { AuthContext } from "../../context/AuthContext";
import { FiCalendar, FiCheckCircle } from "react-icons/fi";

function AddAppointment() {
  const { addAppointment } = useContext(AppointmentContext);
  const { hosts } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    visitorName: "",
    visitorEmail: "",
    visitorPhone: "",
    company: "",
    hostName: "Dr. Sarah Jenkins",
    department: "Computer Science",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "10:00 AM",
    purpose: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.visitorName || !formData.date || !formData.purpose) {
      alert("Please fill all required fields");
      return;
    }

    await addAppointment(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);

    setFormData({
      visitorName: "",
      visitorEmail: "",
      visitorPhone: "",
      company: "",
      hostName: "Dr. Sarah Jenkins",
      department: "Computer Science",
      date: new Date().toISOString().split("T")[0],
      timeSlot: "10:00 AM",
      purpose: "",
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 className="page-title">Schedule Pre-Booked Visit</h1>
      <p className="page-subtitle">Pre-register expected campus guests for instant automatic approval upon arrival.</p>

      {submitted && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "12px",
            background: "rgba(16, 185, 129, 0.2)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            marginBottom: "1.5rem",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#34d399",
          }}
        >
          <FiCheckCircle style={{ fontSize: "1.3rem" }} />
          Appointment Pre-Booked Successfully! Notification sent to Host.
        </div>
      )}

      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Visitor Name *</label>
              <input
                type="text"
                name="visitorName"
                className="input-field"
                placeholder="Guest Full Name"
                value={formData.visitorName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Visitor Email</label>
              <input
                type="email"
                name="visitorEmail"
                className="input-field"
                placeholder="guest@example.com"
                value={formData.visitorEmail}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="visitorPhone"
                className="input-field"
                placeholder="+1 555-0199"
                value={formData.visitorPhone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Company / Organization</label>
              <input
                type="text"
                name="company"
                className="input-field"
                placeholder="Affiliated Organization"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Host Employee</label>
              <select name="hostName" className="select-field" value={formData.hostName} onChange={handleChange}>
                {hosts.map((h) => (
                  <option key={h._id} value={h.name}>
                    {h.name} ({h.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Department</label>
              <select name="department" className="select-field" value={formData.department} onChange={handleChange}>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Administration">Administration</option>
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label>Expected Visit Date *</label>
              <input
                type="date"
                name="date"
                className="input-field"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expected Time Slot</label>
              <input
                type="text"
                name="timeSlot"
                className="input-field"
                placeholder="e.g. 10:30 AM"
                value={formData.timeSlot}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Meeting Agenda / Purpose *</label>
            <input
              type="text"
              name="purpose"
              className="input-field"
              placeholder="e.g. Research Collaboration, Interview"
              value={formData.purpose}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
            <FiCalendar /> Pre-Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAppointment;
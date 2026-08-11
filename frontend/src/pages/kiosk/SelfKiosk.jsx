import { useState, useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import { AuthContext } from "../../context/AuthContext";
import WebcamCapture from "../../components/WebcamCapture";
import PassBadgeCard from "../../components/PassBadgeCard";
import { FiMonitor, FiUserCheck, FiArrowRight, FiCheckCircle } from "react-icons/fi";

function SelfKiosk() {
  const { addVisitor } = useContext(VisitorContext);
  const { hosts } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "Computer Science",
    hostName: "Dr. Sarah Jenkins",
    purpose: "",
    photo: "",
  });

  const [createdPass, setCreatedPass] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoCapture = (photoData) => {
    setFormData((prev) => ({ ...prev, photo: photoData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.purpose) {
      alert("Please fill in your Name, Phone Number, and Purpose of visit.");
      return;
    }

    const created = await addVisitor(formData);
    setCreatedPass(created);
  };

  const startNewRegistration = () => {
    setCreatedPass(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      department: "Computer Science",
      hostName: "Dr. Sarah Jenkins",
      purpose: "",
      photo: "",
    });
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1rem auto",
            boxShadow: "0 0 25px var(--primary-glow)",
          }}
        >
          <FiMonitor style={{ fontSize: "2rem", color: "#ffffff" }} />
        </div>
        <h1 className="page-title" style={{ fontSize: "2.2rem" }}>Lobby Self-Service Kiosk</h1>
        <p className="page-subtitle" style={{ fontSize: "1.05rem" }}>
          Welcome! Please complete your quick self-check-in to receive your digital visitor pass.
        </p>
      </div>

      {!createdPass ? (
        <div className="glass-card" style={{ padding: "2.5rem" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "var(--text-muted)" }}>
                Step 1: Take Visitor Photo Selfie
              </label>
              <WebcamCapture onCapture={handlePhotoCapture} initialPhoto={formData.photo} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div className="form-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="e.g. John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  className="input-field"
                  placeholder="+1 555-0199"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Company / Organization</label>
                <input
                  type="text"
                  name="company"
                  className="input-field"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div className="form-group">
                <label>Department You Are Visiting</label>
                <select name="department" className="select-field" value={formData.department} onChange={handleChange}>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Administration">Administration</option>
                  <option value="Human Resources">Human Resources</option>
                </select>
              </div>

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
            </div>

            <div className="form-group">
              <label>Purpose of Visit *</label>
              <input
                type="text"
                name="purpose"
                className="input-field"
                placeholder="e.g. Meeting with Professor, Seminar, Delivery"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", marginTop: "1rem" }}>
              Print & Issue My Pass <FiArrowRight />
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", marginBottom: "1.5rem" }}>
            <FiCheckCircle style={{ fontSize: "2rem" }} />
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800" }}>Check-In Complete!</h2>
          </div>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", textAlign: "center" }}>
            Your pass has been registered. Please present your QR badge at the security gate.
          </p>

          <PassBadgeCard visitorPass={createdPass} />

          <button className="btn btn-secondary" style={{ marginTop: "2rem" }} onClick={startNewRegistration}>
            <FiUserCheck /> Register Another Visitor
          </button>
        </div>
      )}
    </div>
  );
}

export default SelfKiosk;

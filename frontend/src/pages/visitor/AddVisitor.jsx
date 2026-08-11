import { useState, useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import { AuthContext } from "../../context/AuthContext";
import WebcamCapture from "../../components/WebcamCapture";
import PassBadgeCard from "../../components/PassBadgeCard";
import { FiUserCheck, FiArrowRight, FiCheckCircle } from "react-icons/fi";

function AddVisitor() {
  const { addVisitor } = useContext(VisitorContext);
  const { hosts } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    department: "Computer Science",
    hostName: "Dr. Sarah Jenkins",
    idType: "National ID",
    idNumber: "",
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
      alert("Please complete all required fields (Name, Phone, Purpose)");
      return;
    }

    const result = await addVisitor(formData);
    setCreatedPass(result);

    // Reset Form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      department: "Computer Science",
      hostName: "Dr. Sarah Jenkins",
      idType: "National ID",
      idNumber: "",
      purpose: "",
      photo: "",
    });
  };

  return (
    <div>
      <h1 className="page-title">Register Walk-in Visitor</h1>
      <p className="page-subtitle">Capture visitor details, webcam snapshot, and generate digital access pass.</p>

      <div style={{ display: "grid", gridTemplateColumns: createdPass ? "1fr 1fr" : "1fr", gap: "2rem" }}>
        {/* Registration Form */}
        <div className="glass-card">
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiUserCheck style={{ color: "var(--primary)" }} /> Visitor Information
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Photo Capture Section */}
            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
              <label>Visitor Selfie / Photo ID</label>
              <WebcamCapture onCapture={handlePhotoCapture} initialPhoto={formData.photo} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  className="input-field"
                  placeholder="+1 555-0192"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Organization / Company</label>
                <input
                  type="text"
                  name="company"
                  className="input-field"
                  placeholder="Company or Organization"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Department to Visit</label>
                <select name="department" className="select-field" value={formData.department} onChange={handleChange}>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Administration">Administration</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Security & Safety">Security & Safety</option>
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>ID Proof Type</label>
                <select name="idType" className="select-field" value={formData.idType} onChange={handleChange}>
                  <option value="National ID">National ID / Passport</option>
                  <option value="Driver License">Driver's License</option>
                  <option value="Student Card">Student / Employee Card</option>
                </select>
              </div>

              <div className="form-group">
                <label>ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  className="input-field"
                  placeholder="ID Number"
                  value={formData.idNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Purpose of Visit *</label>
              <input
                type="text"
                name="purpose"
                className="input-field"
                placeholder="e.g. Guest Speaker, Meeting, Interview"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
              Issue Digital Pass <FiArrowRight />
            </button>
          </form>
        </div>

        {/* Generated Badge Preview Side Panel */}
        {createdPass && (
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", marginBottom: "1.25rem" }}>
              <FiCheckCircle style={{ fontSize: "1.4rem" }} />
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Pass Issued Successfully!</h3>
            </div>

            <PassBadgeCard visitorPass={createdPass} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddVisitor;
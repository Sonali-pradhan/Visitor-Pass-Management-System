import { useState, useContext } from "react";
import { PassContext } from "../../context/PassContext";
import { AuthContext } from "../../context/AuthContext";
import PassBadgeCard from "../../components/PassBadgeCard";
import { FiCreditCard, FiCheckCircle } from "react-icons/fi";

function GeneratePass() {
  const { addPass } = useContext(PassContext);
  const { hosts } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    visitorName: "",
    company: "Independent Visitor",
    hostName: "Dr. Sarah Jenkins",
    department: "Computer Science",
    passType: "Standard",
    purpose: "Official Meeting",
  });

  const [generatedPass, setGeneratedPass] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.visitorName || !formData.hostName) {
      alert("Please fill all required fields");
      return;
    }

    const created = addPass({
      passId: "VP-" + Math.floor(100000 + Math.random() * 900000),
      visitorName: formData.visitorName,
      company: formData.company,
      hostName: formData.hostName,
      department: formData.department,
      passType: formData.passType,
      purpose: formData.purpose,
      status: "active",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });

    setGeneratedPass(created);
  };

  return (
    <div>
      <h1 className="page-title">Digital Pass Studio</h1>
      <p className="page-subtitle">Configure access privileges, pass types, and generate official printable security badges.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        {/* Pass Configuration Form */}
        <div className="glass-card">
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FiCreditCard style={{ color: "var(--primary)" }} /> Pass Configuration
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Visitor Name *</label>
              <input
                type="text"
                name="visitorName"
                className="input-field"
                placeholder="e.g. Alice Vance"
                value={formData.visitorName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company / Affiliation</label>
              <input
                type="text"
                name="company"
                className="input-field"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
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
                  <option value="Security & Safety">Security & Safety</option>
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="form-group">
                <label>Pass Type Tier</label>
                <select name="passType" className="select-field" value={formData.passType} onChange={handleChange}>
                  <option value="Standard">Standard Day Pass</option>
                  <option value="VIP Pass">VIP Priority Access</option>
                  <option value="Contractor">Contractor / Vendor</option>
                  <option value="Event">Event Visitor</option>
                </select>
              </div>

              <div className="form-group">
                <label>Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  className="input-field"
                  value={formData.purpose}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "1rem" }}>
              Generate Pass Badge
            </button>
          </form>
        </div>

        {/* Live Badge Preview */}
        <div className="glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-cyan)", marginBottom: "1.25rem" }}>
            <FiCheckCircle style={{ fontSize: "1.3rem" }} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>
              {generatedPass ? "Generated Pass Badge" : "Badge Live Preview"}
            </h3>
          </div>

          <PassBadgeCard visitorPass={generatedPass || formData} />
        </div>
      </div>
    </div>
  );
}

export default GeneratePass;
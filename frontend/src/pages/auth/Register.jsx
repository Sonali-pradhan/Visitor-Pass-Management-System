import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FiShield, FiUser, FiMail, FiLock, FiBriefcase } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "employee",
    department: "Computer Science",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("⚠️ Passwords do not match!");
      return;
    }

    const res = await register(formData);
    if (res.success) {
      alert("Account created successfully! Please sign in.");
      navigate("/");
    } else {
      setErrorMsg(res.message || "Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: "480px",
          width: "100%",
          padding: "2.5rem",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(99, 102, 241, 0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, var(--primary) 0%, var(--accent-cyan) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem auto",
              boxShadow: "0 0 20px var(--primary-glow)",
            }}
          >
            <FiShield style={{ fontSize: "1.8rem", color: "#ffffff" }} />
          </div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#ffffff" }}>Create Workstation Account</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Register as an Employee, Guard, or Administrator
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: "0.85rem 1rem",
              borderRadius: "10px",
              background: "rgba(244, 63, 94, 0.18)",
              border: "1px solid rgba(244, 63, 94, 0.4)",
              color: "#fb7185",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FiUser /> Full Name
            </label>
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="e.g. Dr. Alex Vance"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <FiMail /> Email Address
            </label>
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="alex@system.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FiBriefcase /> Role
              </label>
              <select name="role" className="select-field" value={formData.role} onChange={handleChange}>
                <option value="employee">Employee / Host</option>
                <option value="security">Security Guard</option>
                <option value="admin">Administrator</option>
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
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FiLock /> Password
              </label>
              <input
                type="password"
                name="password"
                className="input-field"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <FiLock /> Confirm
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input-field"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem", marginTop: "1rem" }}>
            Register Account
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "var(--primary)", fontWeight: "600", textDecoration: "none" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
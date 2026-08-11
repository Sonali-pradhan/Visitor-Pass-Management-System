import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FiGrid,
  FiUserPlus,
  FiUsers,
  FiCalendar,
  FiCreditCard,
  FiCheckSquare,
  FiShield,
  FiMonitor,
  FiLogOut,
  FiClock,
} from "react-icons/fi";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const userRole = user?.role || "admin";

  const allNavItems = [
    { path: "/dashboard", label: "Admin Control Center", icon: <FiGrid />, roles: ["admin"] },
    { path: "/security-dashboard", label: "Security Gate Portal", icon: <FiShield />, roles: ["admin", "security"] },
    { path: "/employee-dashboard", label: "Employee Host Hub", icon: <FiUsers />, roles: ["admin", "employee"] },
    { path: "/add-visitor", label: "Register Visitor", icon: <FiUserPlus />, roles: ["admin", "security", "employee"] },
    { path: "/visitors", label: "Visitors Directory", icon: <FiUsers />, roles: ["admin", "security", "employee"] },
    { path: "/add-appointment", label: "Pre-Book Visit", icon: <FiCalendar />, roles: ["admin", "employee"] },
    { path: "/appointments", label: "Appointments List", icon: <FiClock />, roles: ["admin", "employee"] },
    { path: "/generate-pass", label: "Generate Pass Studio", icon: <FiCreditCard />, roles: ["admin", "security", "employee"] },
    { path: "/passes", label: "Passes Directory", icon: <FiCreditCard />, roles: ["admin", "security"] },
    { path: "/checkin", label: "Check In / Check Out", icon: <FiCheckSquare />, roles: ["admin", "security"] },
    { path: "/kiosk", label: "Lobby Self-Kiosk", icon: <FiMonitor />, roles: ["admin", "security", "employee"] },
  ];

  const visibleNavItems = allNavItems.filter((item) => item.roles.includes(userRole));

  return (
    <div
      style={{
        width: "260px",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid var(--glass-border)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.5rem 1rem",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <div>
        <div style={{ padding: "0 0.5rem 1rem 0.5rem", color: "var(--text-dim)", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {userRole.toUpperCase()} WORKSTATION
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {visibleNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "0.75rem 1rem",
                borderRadius: "10px",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                background: isActive ? "linear-gradient(90deg, var(--primary) 0%, rgba(99, 102, 241, 0.4) 100%)" : "transparent",
                border: isActive ? "1px solid var(--primary-glow)" : "1px solid transparent",
                textDecoration: "none",
                transition: "all 0.2s ease",
              })}
            >
              <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Role Quick Switch */}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--glass-border)" }}>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: "12px",
            padding: "0.85rem",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: "0.25rem" }}>Logged in as</div>
          <div style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-main)" }}>
            {user?.name || "Guest User"}
          </div>
          <span
            className="badge"
            style={{
              marginTop: "0.35rem",
              background:
                userRole === "admin"
                  ? "rgba(245, 158, 11, 0.15)"
                  : userRole === "security"
                  ? "rgba(6, 182, 212, 0.15)"
                  : "rgba(16, 185, 129, 0.15)",
              color:
                userRole === "admin"
                  ? "#fbbf24"
                  : userRole === "security"
                  ? "#38bdf8"
                  : "#34d399",
              border: "1px solid currentColor",
            }}
          >
            {userRole} Mode
          </span>
        </div>

        <button
          className="btn btn-secondary"
          onClick={handleLogout}
          style={{ width: "100%", justifyContent: "center" }}
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
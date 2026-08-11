import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/admin/Dashboard";
import AddVisitor from "../pages/visitor/AddVisitor";
import Visitors from "../pages/visitor/Visitors";

import AddAppointment from "../pages/appointments/AddAppointment";
import AppointmentList from "../pages/appointments/AppointmentList";
import GeneratePass from "../pages/pass/GeneratePass";
import PassList from "../pages/pass/PassList";
import CheckInOut from "../pages/security/CheckInOut";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import SecurityDashboard from "../pages/security/SecurityDashboard";
import SelfKiosk from "../pages/kiosk/SelfKiosk";

import ProtectedRoute from "../components/ProtectedRoute";

function DefaultRedirect() {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;
  if (user.role === "security") return <Navigate to="/security-dashboard" replace />;
  if (user.role === "employee") return <Navigate to="/employee-dashboard" replace />;
  return <Navigate to="/dashboard" replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Layout wrapper */}
        <Route element={<DashboardLayout />}>
          {/* Smart default landing redirect */}
          <Route path="/home" element={<DefaultRedirect />} />

          {/* Admin Only Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Security Guard Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "security"]} />}>
            <Route path="/security-dashboard" element={<SecurityDashboard />} />
            <Route path="/checkin" element={<CheckInOut />} />
            <Route path="/passes" element={<PassList />} />
          </Route>

          {/* Employee Host Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="/add-appointment" element={<AddAppointment />} />
            <Route path="/appointments" element={<AppointmentList />} />
          </Route>

          {/* Shared Authorized Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin", "security", "employee"]} />}>
            <Route path="/add-visitor" element={<AddVisitor />} />
            <Route path="/visitors" element={<Visitors />} />
            <Route path="/generate-pass" element={<GeneratePass />} />
            <Route path="/kiosk" element={<SelfKiosk />} />
          </Route>
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
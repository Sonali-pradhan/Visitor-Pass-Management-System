import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import VisitorRegistration from "../pages/visitor/VisitorRegistration";
import EmployeeDashboard from "../pages/employee/EmployeeDashboard";
import SecurityDashboard from "../pages/security/SecurityDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardLayout />} />

        <Route path="/add-visitor" element={<AddVisitor />} />
        <Route path="/visitors" element={<Visitors />} />

        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/appointments" element={<AppointmentList />} />
        
        <Route
  path="/checkin"
  element={<CheckInOut />}
/>
        <Route
  path="/generate-pass"
  element={<GeneratePass />}
/>

<Route
  path="/passes"
  element={<PassList />}
/>

<Route
  path="/visitor-register"
  element={<VisitorRegistration />}
/>

<Route
  path="/employee-dashboard"
  element={<EmployeeDashboard />}
/>

<Route
  path="/security-dashboard"
  element={<SecurityDashboard />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../pages/admin/Dashboard";

function DashboardLayout() {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <Sidebar />

        <div className="main-content">
          <Dashboard />
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
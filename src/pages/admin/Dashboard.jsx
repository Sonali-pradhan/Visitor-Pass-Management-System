import { useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import { AppointmentContext } from "../../context/AppointmentContext";
import { PassContext } from "../../context/PassContext";

function Dashboard() {
  const { visitors } = useContext(VisitorContext);
  const { appointments } = useContext(AppointmentContext);
  const { passes } = useContext(PassContext);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Visitors</h3>
          <p>{visitors.length}</p>
        </div>

        <div className="card">
          <h3>Appointments</h3>
          <p>{appointments.length}</p>
        </div>

        <div className="card">
          <h3>Active Passes</h3>
          <p>{passes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
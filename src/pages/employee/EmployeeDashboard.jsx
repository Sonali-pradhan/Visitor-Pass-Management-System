function EmployeeDashboard() {
  return (
    <div className="employee-dashboard">
      <h1>Employee Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Add Visitor</h3>
          <p>Manage Visitors</p>
        </div>

        <div className="card">
          <h3>Visitors List</h3>
          <p>View Visitors</p>
        </div>

        <div className="card">
          <h3>Add Appointment</h3>
          <p>Create Appointment</p>
        </div>

        <div className="card">
          <h3>Appointments</h3>
          <p>View Appointments</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
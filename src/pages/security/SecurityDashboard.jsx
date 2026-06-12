function SecurityDashboard() {
  return (
    <div className="security-dashboard">
      <h1>Security Dashboard</h1>

      <div className="cards">

        <div className="card">
          <h3>Check In</h3>
          <p>Visitor Entry</p>
        </div>

        <div className="card">
          <h3>Check Out</h3>
          <p>Visitor Exit</p>
        </div>

        <div className="card">
          <h3>Verify Pass</h3>
          <p>Check Visitor Pass</p>
        </div>

        <div className="card">
          <h3>Scan QR</h3>
          <p>Verify QR Code</p>
        </div>

      </div>
    </div>
  );
}

export default SecurityDashboard;
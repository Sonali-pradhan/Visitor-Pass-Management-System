import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <ul>

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/add-visitor">
            Add Visitor
          </Link>
        </li>

        <li>
          <Link to="/visitors">
            Visitors
          </Link>
        </li>

        <li>
  <Link to="/add-appointment">
    Add Appointment
  </Link>
</li>

<li>
  <Link to="/appointments">
    Appointments
  </Link>
</li>
<li>
  <Link to="/generate-pass">
    Generate Pass
  </Link>
</li>

<li>
  <Link to="/passes">
    Pass List
  </Link>
</li>
<li>
  <Link to="/checkin">
    Check In/Out
  </Link>
</li>
<li>
  <Link to="/">
    Logout
  </Link>
</li>

      </ul>

    </div>
  );
}

export default Sidebar;
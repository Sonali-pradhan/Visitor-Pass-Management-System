import { useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import "./Appointment.css";

function AppointmentList() {
  const { appointments } = useContext(AppointmentContext);

  return (
    <div className="appointments-page">
      <h2>Appointment List</h2>

      <table>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Host</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.visitorName}</td>
              <td>{appointment.hostName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
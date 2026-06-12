import { useState, useContext } from "react";
import { AppointmentContext } from "../../context/AppointmentContext";
import "./Appointment.css";

function AddAppointment() {
  const { addAppointment } = useContext(AppointmentContext);

  const [formData, setFormData] = useState({
    visitorName: "",
    hostName: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addAppointment(formData);

    alert("Appointment Created Successfully");

    setFormData({
      visitorName: "",
      hostName: "",
      date: "",
      time: "",
    });
  };

  return (
    <div className="add-appointment-page">
      <form
        className="appointment-form"
        onSubmit={handleSubmit}
      >
        <h2>Create Appointment</h2>

        <input
          type="text"
          name="visitorName"
          placeholder="Visitor Name"
          value={formData.visitorName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="hostName"
          placeholder="Host Name"
          value={formData.hostName}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />

        <button type="submit">
          Create Appointment
        </button>
      </form>
    </div>
  );
}

export default AddAppointment;
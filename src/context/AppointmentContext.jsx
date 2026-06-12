import { createContext, useState } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  return (
    <AppointmentContext.Provider
      value={{ appointments, addAppointment }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
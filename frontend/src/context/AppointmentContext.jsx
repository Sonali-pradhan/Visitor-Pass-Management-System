import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AppointmentContext = createContext();

const initialMockAppointments = [
  {
    _id: "apt1",
    visitorName: "Sophia Martinez",
    visitorEmail: "sophia.m@designs.com",
    visitorPhone: "+1 555-7788",
    company: "Creative Studio",
    hostName: "Dr. Sarah Jenkins",
    department: "Computer Science",
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    timeSlot: "10:30 AM",
    purpose: "Campus UI/UX Design Consultation",
    status: "pending",
  },
  {
    _id: "apt2",
    visitorName: "Liam Johnson",
    visitorEmail: "liam.j@techpartner.org",
    visitorPhone: "+1 555-3344",
    company: "TechPartner Org",
    hostName: "Prof. Robert Lang",
    department: "Engineering",
    date: new Date().toISOString().split("T")[0],
    timeSlot: "02:00 PM",
    purpose: "Robotics Grant Review",
    status: "approved",
  },
];

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(initialMockAppointments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/appointments");
      if (res.data && res.data.length > 0) {
        setAppointments(res.data);
      }
    } catch {
      // Retain mock fallback
    } finally {
      setLoading(false);
    }
  };

  const addAppointment = async (data) => {
    const newApt = {
      _id: "apt-" + Date.now(),
      status: "pending",
      ...data,
    };

    try {
      const res = await api.post("/appointments", data);
      if (res.data && res.data.appointment) {
        setAppointments((prev) => [res.data.appointment, ...prev]);
        return res.data.appointment;
      }
    } catch {
      // Fallback
    }

    setAppointments((prev) => [newApt, ...prev]);
    return newApt;
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
    } catch {
      // Fallback
    }

    setAppointments((prev) =>
      prev.map((apt) => (apt._id === id ? { ...apt, status } : apt))
    );
  };

  const deleteAppointment = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
    } catch {
      // Fallback
    }
    setAppointments((prev) => prev.filter((apt) => apt._id !== id));
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        fetchAppointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const VisitorContext = createContext();

const initialMockVisitors = [
  {
    _id: "v1",
    passId: "VP-882194",
    name: "David Miller",
    email: "david.m@gmail.com",
    phone: "+1 555-4321",
    company: "TechCorp Labs",
    department: "Computer Science",
    purpose: "Guest Lecture on AI & Machine Learning",
    hostName: "Dr. Sarah Jenkins",
    status: "inside",
    checkInTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    _id: "v2",
    passId: "VP-910243",
    name: "Elena Rostova",
    email: "elena.r@fintech.io",
    phone: "+1 555-9876",
    company: "FinTech Systems",
    department: "Engineering",
    purpose: "Partnership & Research Meeting",
    hostName: "Prof. Robert Lang",
    status: "approved",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    _id: "v3",
    passId: "VP-304912",
    name: "Carlos Mendez",
    email: "carlos.m@construct.com",
    phone: "+1 555-2468",
    company: "Apex Construction",
    department: "Administration",
    purpose: "Facility Site Inspection",
    hostName: "Alex Vance (Admin)",
    status: "outside",
    checkInTime: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    checkOutTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
];

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState(initialMockVisitors);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await api.get("/visitors");
      if (res.data && res.data.length > 0) {
        setVisitors(res.data);
      }
    } catch {
      // Retain mock fallback
    } finally {
      setLoading(false);
    }
  };

  const addVisitor = async (newVisitor) => {
    const passId = "VP-" + Math.floor(100000 + Math.random() * 900000);
    const created = {
      _id: "v-" + Date.now(),
      passId,
      status: "approved",
      ...newVisitor,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await api.post("/visitors", newVisitor);
      if (res.data && res.data.visitor) {
        setVisitors((prev) => [res.data.visitor, ...prev]);
        return res.data.visitor;
      }
    } catch {
      // Fallback local update
    }

    setVisitors((prev) => [created, ...prev]);
    return created;
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/visitors/${id}/status`, { status });
    } catch {
      // Local update
    }

    setVisitors((prev) =>
      prev.map((v) => (v._id === id || v.passId === id ? { ...v, status } : v))
    );
  };

  const checkInVisitor = async (passId) => {
    try {
      await api.post("/visitors/checkin", { passId });
    } catch {
      // Fallback local update
    }

    setVisitors((prev) =>
      prev.map((v) =>
        v.passId === passId
          ? { ...v, status: "inside", checkInTime: new Date().toISOString() }
          : v
      )
    );
  };

  const checkOutVisitor = async (passId) => {
    try {
      await api.post("/visitors/checkout", { passId });
    } catch {
      // Fallback local update
    }

    setVisitors((prev) =>
      prev.map((v) =>
        v.passId === passId
          ? { ...v, status: "outside", checkOutTime: new Date().toISOString() }
          : v
      )
    );
  };

  const deleteVisitor = async (id) => {
    try {
      await api.delete(`/visitors/${id}`);
    } catch {
      // local update
    }
    setVisitors((prev) => prev.filter((v) => v._id !== id && v.passId !== id));
  };

  return (
    <VisitorContext.Provider
      value={{
        visitors,
        loading,
        fetchVisitors,
        addVisitor,
        updateStatus,
        checkInVisitor,
        checkOutVisitor,
        deleteVisitor,
      }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
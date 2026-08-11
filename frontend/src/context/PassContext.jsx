import { createContext, useState } from "react";

export const PassContext = createContext();

const initialMockPasses = [
  {
    _id: "p1",
    passId: "VP-882194",
    visitorName: "David Miller",
    hostName: "Dr. Sarah Jenkins",
    department: "Computer Science",
    passType: "Standard",
    status: "active",
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    accessGates: ["Main Gate A", "CS Block"],
  },
  {
    _id: "p2",
    passId: "VP-910243",
    visitorName: "Elena Rostova",
    hostName: "Prof. Robert Lang",
    department: "Engineering",
    passType: "VIP Pass",
    status: "active",
    validFrom: new Date().toISOString(),
    validTo: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    accessGates: ["Main Gate A", "VIP Auditorium"],
  },
];

export const PassProvider = ({ children }) => {
  const [passes, setPasses] = useState(initialMockPasses);

  const addPass = (passData) => {
    const newPass = {
      _id: "p-" + Date.now(),
      passId: passData.passId || "VP-" + Math.floor(100000 + Math.random() * 900000),
      status: "active",
      validFrom: new Date().toISOString(),
      validTo: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      accessGates: ["Main Entrance", "Lobby"],
      ...passData,
    };
    setPasses((prev) => [newPass, ...prev]);
    return newPass;
  };

  const revokePass = (passId) => {
    setPasses((prev) =>
      prev.map((p) => (p.passId === passId ? { ...p, status: "revoked" } : p))
    );
  };

  return (
    <PassContext.Provider value={{ passes, addPass, revokePass }}>
      {children}
    </PassContext.Provider>
  );
};
import { createContext, useState } from "react";

export const VisitorContext = createContext();

export const VisitorProvider = ({ children }) => {
  const [visitors, setVisitors] = useState([]);

  const addVisitor = (visitor) => {
    setVisitors((prev) => [...prev, visitor]);
  };

  return (
    <VisitorContext.Provider
      value={{ visitors, addVisitor }}
    >
      {children}
    </VisitorContext.Provider>
  );
};
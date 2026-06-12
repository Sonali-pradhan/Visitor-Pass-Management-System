import { createContext, useState } from "react";

export const PassContext = createContext();

export const PassProvider = ({ children }) => {
  const [passes, setPasses] = useState([]);

  const addPass = (pass) => {
    setPasses((prev) => [...prev, pass]);
  };

  return (
    <PassContext.Provider value={{ passes, addPass }}>
      {children}
    </PassContext.Provider>
  );
};
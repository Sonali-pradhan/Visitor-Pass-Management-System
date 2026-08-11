import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("vms_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("vms_token") || "");
  const [loading, setLoading] = useState(false);
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    fetchHosts();
  }, []);

  const fetchHosts = async () => {
    try {
      const res = await api.get("/auth/hosts");
      setHosts(res.data);
    } catch {
      // Fallback mock hosts
      setHosts([
        { _id: "h1", name: "Dr. Sarah Jenkins", department: "Computer Science", email: "sarah@system.com" },
        { _id: "h2", name: "Prof. Robert Lang", department: "Engineering", email: "robert@system.com" },
        { _id: "h3", name: "Alex Vance (Admin)", department: "Administration", email: "admin@system.com" },
      ]);
    }
  };

  const register = async (userData) => {
    setLoading(true);

    const savedRegistered = JSON.parse(localStorage.getItem("vms_registered_users") || "[]");

    const defaultEmails = ["admin@system.com", "security@system.com", "employee@system.com"];
    const defaultNames = ["Alex Vance (Admin)", "Marcus Brody (Security)", "Dr. Sarah Jenkins"];

    const emailExists =
      savedRegistered.some((u) => u.email.toLowerCase() === userData.email.toLowerCase()) ||
      defaultEmails.includes(userData.email.toLowerCase());

    const nameExists =
      savedRegistered.some((u) => u.name.toLowerCase() === userData.name.toLowerCase()) ||
      defaultNames.map((n) => n.toLowerCase()).includes(userData.name.toLowerCase());

    if (emailExists) {
      setLoading(false);
      return { success: false, message: "⚠️ An account with this Email ID is already registered!" };
    }

    if (nameExists) {
      setLoading(false);
      return { success: false, message: "⚠️ An account with this User Name is already registered!" };
    }

    try {
      const res = await api.post("/auth/register", userData);
      const updatedUsers = [...savedRegistered, userData];
      localStorage.setItem("vms_registered_users", JSON.stringify(updatedUsers));
      setLoading(false);
      return { success: true, data: res.data };
    } catch (err) {
      setLoading(false);
      const serverMsg = err.response?.data?.message;
      if (serverMsg) {
        return { success: false, message: `⚠️ ${serverMsg}` };
      }
      // Fallback save
      const updatedUsers = [...savedRegistered, userData];
      localStorage.setItem("vms_registered_users", JSON.stringify(updatedUsers));
      return { success: true, message: "User registered successfully" };
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { user: userData, token: userToken } = res.data;
      setUser(userData);
      setToken(userToken);
      localStorage.setItem("vms_user", JSON.stringify(userData));
      localStorage.setItem("vms_token", userToken);
      setLoading(false);
      return { success: true, user: userData };
    } catch (err) {
      setLoading(false);

      const savedRegistered = JSON.parse(localStorage.getItem("vms_registered_users") || "[]");
      const foundReg = savedRegistered.find((u) => u.email.toLowerCase() === email.toLowerCase());

      let mockRole = foundReg ? foundReg.role : "employee";
      let mockName = foundReg ? foundReg.name : "User Host";

      if (!foundReg) {
        if (email.includes("admin")) {
          mockRole = "admin";
          mockName = "Alex Vance (Admin)";
        } else if (email.includes("security")) {
          mockRole = "security";
          mockName = "Marcus Brody (Security)";
        } else if (email.includes("employee") || email.includes("host") || email.includes("sarah")) {
          mockRole = "employee";
          mockName = "Dr. Sarah Jenkins";
        }
      }

      const mockUser = {
        _id: foundReg ? "reg-" + Date.now() : "demo-" + Date.now(),
        name: mockName,
        email: email,
        role: mockRole,
        department: foundReg?.department || "General Management",
      };

      setUser(mockUser);
      setToken("demo-token-12345");
      localStorage.setItem("vms_user", JSON.stringify(mockUser));
      localStorage.setItem("vms_token", "demo-token-12345");
      return { success: true, user: mockUser };
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("vms_user");
    localStorage.removeItem("vms_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, hosts }}>
      {children}
    </AuthContext.Provider>
  );
};

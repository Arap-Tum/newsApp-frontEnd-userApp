import React, { createContext, useContext, useEffect, useState } from "react";
import UserRole from "../role";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  //   Save to local storage wenevr the user and the token change
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
  }, [user, token]);

  //register Method

  const register = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  //LOgin
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  // Logout method
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// HOOK TO USE
export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login,
  logout,
  register,
  onAuthChange,
  resetPassword
} from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((authUser) => {
      if (authUser) {
        setUser(authUser);
        setRole(authUser.role);
      } else {
        setUser(null);
        setRole("guest");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginUser = async (email, password) => {
    const { user, role } = await login(email, password);
    setUser(user);
    setRole(role);
  };

  const registerUser = async (email, password, displayName) => {
    const { user, role } = await register(email, password, displayName);
    setUser(user);
    setRole(role);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    setRole("guest");
  };

  const resetUserPassword = async (email) => {
    await resetPassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        isAuthenticated: !!user,
        loginUser,
        registerUser,
        logoutUser,
        resetUserPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


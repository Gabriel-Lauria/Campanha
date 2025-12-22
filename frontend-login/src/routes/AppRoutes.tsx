import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";

const AppRoutes = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const handleLogin = (jwt: string) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        {/* Users */}
        <Route
          path="/users"
          element={token ? <Users /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

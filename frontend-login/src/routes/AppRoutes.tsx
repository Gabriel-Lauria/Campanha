import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import AppLayout from "../layout/AppLayout";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user, logout } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {user ? (
        <Route element={<AppLayout onLogout={logout} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Landing from "./pages/Landing";

import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Routes>
      {/* ✅ LANDING PAGE */}
      <Route
        path="/"
        element={
          !user ? (
            <Landing />
          ) : user.role === "STUDENT" ? (
            <Navigate to="/student-dashboard" />
          ) : (
            <Navigate to="/admin-dashboard" />
          )
        }
      />

      {/* STUDENT */}
      <Route
        path="/student-login"
        element={!user ? <StudentLogin setUser={handleLogin} /> : <Navigate to="/" />}
      />

      <Route path="/student-register" element={<StudentRegister />} />

      <Route
        path="/student-dashboard"
        element={
          user?.role === "STUDENT"
            ? <StudentDashboard user={user} onLogout={handleLogout} />
            : <Navigate to="/" />
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin-login"
        element={!user ? <AdminLogin setUser={handleLogin} /> : <Navigate to="/" />}
      />

      <Route
        path="/admin-dashboard"
        element={
          user?.role === "ADMIN" || user?.role === "COMPANY"
            ? <AdminDashboard user={user} onLogout={handleLogout} />
            : <Navigate to="/" />
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

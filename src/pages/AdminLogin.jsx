import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminLogin({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/user-login", {
        username,
        password,
      });

      setUser({
        username: res.data.username,
        role: res.data.role, // ADMIN / COMPANY
      });

      navigate("/admin-dashboard");
    } catch (err) {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3 text-center">Admin / Company Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;

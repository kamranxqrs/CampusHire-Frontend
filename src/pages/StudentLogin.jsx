import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";


function StudentLogin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/student-login", {
        username: email,   // backend LoginRequest uses username field
        password: password,
      });

      setUser({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: "STUDENT",
      });

      navigate("/student-dashboard");
    } catch (err) {
      alert("Invalid student credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Student Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Login
        </button>
      </form>

      <div className="text-center mt-3">
        New student? <Link to="/student-register">Register</Link>
      </div>
    </div>

  );
}

export default StudentLogin;

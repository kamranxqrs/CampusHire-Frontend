import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function StudentRegister() {
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/students/register", student);
      alert("Student registered successfully");
      navigate("/student-login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-3">Student Registration</h3>

      <form onSubmit={register}>
        <input name="name" className="form-control mb-2" placeholder="Name" onChange={handleChange} />
        <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} />
        <input name="contactNumber" className="form-control mb-2" placeholder="Contact Number" onChange={handleChange} />
        <input name="department" className="form-control mb-2" placeholder="Department" onChange={handleChange} />
        <input name="graduationYear" className="form-control mb-3" placeholder="Graduation Year" onChange={handleChange} />

        <button className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default StudentRegister;

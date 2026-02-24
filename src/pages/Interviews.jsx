import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Interviews({ user }) {
  const [interviews, setInterviews] = useState([]);
  const [interview, setInterview] = useState({});
  const navigate = useNavigate();

  // 🔐 Role protection
  useEffect(() => {
    if (!user || user.role === "STUDENT") {
      navigate("/admin-login");
    }
  }, [user, navigate]);

  const loadInterviews = async () => {
    const res = await api.get("/interviews/allInterviews");
    setInterviews(res.data);
  };

  useEffect(() => {
    loadInterviews();
  }, []);

  const handleChange = (e) => {
    setInterview({ ...interview, [e.target.name]: e.target.value });
  };

  const scheduleInterview = async (e) => {
    e.preventDefault();

    try {
      await api.post("/interviews/scheduleInterview", interview);
      alert("Interview scheduled");
      setInterview({});
      loadInterviews();
    } catch {
      alert("Failed to schedule interview");
    }
  };

  const cancelInterview = async (id) => {
    await api.delete(`/interviews/cancelInterview/${id}`);
    loadInterviews();
  };

  return (
    <div className="container mt-4">
      <h3>Interview Management</h3>

      {/* Schedule Interview */}
      <form onSubmit={scheduleInterview} className="mb-4">
        <h5>Schedule Interview</h5>

        <input
          name="studentId"
          className="form-control mb-2"
          placeholder="Student ID"
          onChange={handleChange}
        />

        <input
          name="jobApplicationId"
          className="form-control mb-2"
          placeholder="Job Application ID"
          onChange={handleChange}
        />

        <input
          type="date"
          name="interviewDate"
          className="form-control mb-2"
          onChange={handleChange}
        />

        <select
          name="interviewStatus"
          className="form-select mb-3"
          onChange={handleChange}
        >
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>

        <button className="btn btn-primary">
          Schedule
        </button>
      </form>

      {/* Interview List */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student ID</th>
            <th>Application ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {interviews.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.studentId}</td>
              <td>{i.jobApplicationId}</td>
              <td>{i.interviewDate}</td>
              <td>{i.interviewStatus}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => cancelInterview(i.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Interviews;

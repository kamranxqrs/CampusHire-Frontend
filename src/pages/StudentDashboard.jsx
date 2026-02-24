import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function StudentDashboard({ user, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  // 🔐 Role protection
  useEffect(() => {
    if (!user || user.role !== "STUDENT") {
      navigate("/student-login");
    }
  }, [user, navigate]);

  const logout = () => {
    onLogout();
    navigate("/student-login");
  };

  const loadJobs = async () => {
    const res = await api.get("/job-postings/allJobs");
    setJobs(res.data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const applyJob = async (jobId) => {
    try {
      await api.post("/jobApplication/apply", {
        studentId: user.id,
        jobPostingId: jobId,
        status: "APPLIED",
      });
      alert("Job applied successfully");
    } catch {
      alert("Failed to apply");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Welcome, {user?.name}</h3>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      <h5>Available Jobs</h5>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.jobLocation}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => applyJob(job.id)}>
                  Apply
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;

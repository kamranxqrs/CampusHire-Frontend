import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminDashboard({ user, onLogout }) {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  // 🔐 Role protection
  useEffect(() => {
    if (!user || user.role === "STUDENT") {
      navigate("/admin-login");
    }
  }, [user, navigate]);

  const logout = () => {
    onLogout();
    navigate("/admin-login");
  };

  const loadJobs = async () => {
    const res = await api.get("/job-postings/allJobs");
    setJobs(res.data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await api.post("/job-postings/createJob", job);
      alert("Job created");
      setJob({});
      loadJobs();
    } catch {
      alert("Failed to create job");
    }
  };

  const deleteJob = async (id) => {
    await api.delete(`/job-postings/deleteJob/${id}`);
    loadJobs();
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h3>Admin Dashboard ({user?.role})</h3>
        <button className="btn btn-danger btn-sm" onClick={logout}>
          Logout
        </button>
      </div>

      {/* CREATE JOB */}
      <form onSubmit={createJob} className="mb-4">
        <h5>Create Job</h5>
        <input name="jobTitle" className="form-control mb-2" placeholder="Job Title" onChange={handleChange} />
        <input name="companyName" className="form-control mb-2" placeholder="Company Name" onChange={handleChange} />
        <input name="jobLocation" className="form-control mb-2" placeholder="Location" onChange={handleChange} />
        <input name="eligibilityCriteria" className="form-control mb-2" placeholder="Eligibility" onChange={handleChange} />
        <textarea name="jobDescription" className="form-control mb-3" placeholder="Description" onChange={handleChange} />
        <button className="btn btn-primary">Create Job</button>
      </form>

      {/* JOB LIST */}
      <h5>All Jobs</h5>
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
          {jobs.map((j) => (
            <tr key={j.id}>
              <td>{j.jobTitle}</td>
              <td>{j.companyName}</td>
              <td>{j.jobLocation}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteJob(j.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary mt-3" onClick={() => navigate("/interviews")}>
        Manage Interviews
      </button>
    </div>
  );
}

export default AdminDashboard;

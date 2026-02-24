import { useEffect, useState } from "react";
import api from "../api/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const res = await api.get("/job-postings/allJobs");
    setJobs(res.data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Job Listings</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Eligibility</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.jobLocation}</td>
              <td>{job.eligibilityCriteria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jobs;

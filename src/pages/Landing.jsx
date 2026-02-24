import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">Welcome to CampusHire</h2>
      <p className="mb-4">Campus Recruitment Management System</p>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/student-login" className="btn btn-primary">
          Student Login
        </Link>

        <Link to="/admin-login" className="btn btn-secondary">
          Admin / Company Login
        </Link>
      </div>
    </div>
  );
}

export default Landing;

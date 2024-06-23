import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card text-center" style={{ width: "300px" }}></div>
      <div className="card text-center" style={{ width: "300px" }}>
        <div className="card-header h5 text-white bg-primary">
          Password Reset
        </div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
          <div data-mdb-input-init className="form-outline">
            <input type="email" id="typeEmail" className="form-control my-3" />
            <label className="form-label" htmlFor="typeEmail">
              Email input
            </label>
          </div>
          <a href="#" data-mdb-ripple-init className="btn btn-primary w-100">
            Reset password
          </a>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/login" className="fw-bold text-body">
              <u>Login here</u>
            </Link>
            <Link to="/register" className="fw-bold text-body">
              <u>Register here</u>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

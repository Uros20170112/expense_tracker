import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage("Passwords do not match!");
      return;
    }

    axios
      .post("/api/password/reset", { email, password, password_confirmation: passwordConfirm })
      .then((response) => {
        setMessage("Password reset successfully!");
        setTimeout(() => navigate("/login"), 1000);
      })
      .catch((error) => {
        console.error("There was an error resetting the password!", error);
        setMessage("Error resetting password. Please try again.");
      });
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card text-center" style={{ width: "300px" }}>
        <div className="card-header h5 text-white bg-primary">
          Password Reset
        </div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and set your new password.
          </p>
          <form onSubmit={handleResetPassword}>
            <div className="form-outline">
              <input
                type="email"
                id="typeEmail"
                className="form-control my-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="typeEmail">
                Email
              </label>
              <input
                type="password"
                id="typePassword"
                className="form-control my-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="typePassword">
                New Password
              </label>
              <input
                type="password"
                id="typePasswordConfirm"
                className="form-control my-3"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="typePasswordConfirm">
                Confirm new Password
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Reset password
            </button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
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

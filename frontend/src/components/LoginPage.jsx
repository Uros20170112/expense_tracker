import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({ addToken }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();

  function handleInput(e) {
    // console.log(e);
    let newUserData = userData;
    newUserData[e.target.name] = e.target.value;
    setUserData(newUserData);
    // console.log('Email:', userData.email);
    // console.log('Password:', userData.password);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Email:", userData.email);
    // console.log("Password:", userData.password);
    axios
      .post("api/login", userData)
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          window.sessionStorage.setItem("auth_token", res.data.access_token);
          window.sessionStorage.setItem("user_role", res.data.user_role);
          addToken(res.data.auth_token);
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <section className="vh-100" style={{ backgroundcolor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderradius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderradius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i
                          className="fas fa-cubes fa-2x me-3"
                          style={{ color: "#ff6219" }}
                        ></i>
                        <span className="h1 fw-bold mb-0">Expense Tracker</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterspacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          name="email"
                          onChange={handleInput}
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Email address
                        </label>
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          name="password"
                          onChange={handleInput}
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <Link
                        to={"/forgotPassword"}
                        className="small text-muted"
                        href="#!"
                      >
                        <u>Forgot password?</u>
                      </Link>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <Link to="/register" className="fw-bold text-body">
                          <u>Register here</u>
                        </Link>
                      </p>
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";

const NavBar = ({ token }) => {
  const navigate = useNavigate();
  const userRole = window.sessionStorage.getItem("user_role");

  function handleLogout() {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/api/logout",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.sessionStorage.removeItem("auth_token");
        window.sessionStorage.removeItem("user_role");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <nav className="navbar navbar-expand-xl navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Expense Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarBasic"
            aria-controls="navbarBasic"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarBasic">
            <ul className="navbar-nav me-auto mb-2 mb-xl-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Profil
                </a>
              </li>
              {window.sessionStorage.getItem("auth_token") == null ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <u>Login</u>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              )}
              {userRole === "Administrator" ? (
                <li className="nav-item">
                  <a className="nav-link" href="/allUsers">
                    All users
                  </a>
                </li>
              ) : null}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for users"
                aria-label="Search"
              ></input>
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;

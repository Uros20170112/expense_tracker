import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";

const NavBar = ({ token }) => {
  const navigate = useNavigate();
  const userRole = window.sessionStorage.getItem("user_role");
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

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
      });
  }

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      if (allUsers.length === 0) {
        axios
          .get(`/api/users`)
          .then((response) => {
            const users = response.data.data;
            setAllUsers(users);
            filterUsers(users, query);
          });
      } else {
        filterUsers(allUsers, query);
      }
    } else {
      setFoundUsers([]);
    }
  };

  const filterUsers = (users, query) => {
    const filteredUsers = users
      .filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
    setFoundUsers(filteredUsers);
  };

  const handleUserClick = (userId) => {
    setSearchQuery("");
    setFoundUsers([]);
    navigate(`/profile/${userId}`);
  };

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
                <Link to="/" className="nav-link">
                  <u>Home</u>
                </Link>
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
              {window.sessionStorage.getItem("auth_token") != null ? (
                <li className="nav-item">
                  <Link to="/payments" className="nav-link">
                    <u>Payments</u>
                  </Link>
                </li>
              ) : null}
              {userRole === "Administrator" ? (
                <li className="nav-item">
                  <a className="nav-link" href="/allUsers">
                    All users
                  </a>
                </li>
              ) : null}
            </ul>
            <form className="d-flex position-relative">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for users"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {foundUsers.length > 0 && (
                <ul className="list-group position-absolute" style={{ top: "100%", zIndex: 1000, width: "100%" }}>
                  {foundUsers.map((user) => (
                    <li
                      key={user.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleUserClick(user.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {user.name}
                    </li>
                  ))}
                </ul>
              )}
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
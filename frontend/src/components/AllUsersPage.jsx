import React, { useState, useEffect } from "react";
import axios from "axios";

const AllUsers = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API poziv za preuzimanje podataka o trenutno ulogovanom korisniku
    const token = window.sessionStorage.getItem("auth_token");

    if (token) {
      axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user data!", error);
        setError("There was an error fetching the user data");
      });
    }
  }, []);

  if (error) {
    return <div className="container mt-5"><h2 className="mb-4">Error: {error}</h2></div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {user && (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

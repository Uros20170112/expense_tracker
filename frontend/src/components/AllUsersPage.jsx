import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log("API response:", response.data);
      const data = response.data.data;
      if (Array.isArray(data)) {
        setUsers(data);
      }
    });
  }, []);

  return (
    <div className="container">
      {
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default AllUsers;
